import { createClient } from 'hottake/app/server/datastoreclient';
import { FullHotTake, FullVote } from 'hottake/types/all';

import { NextResponse } from 'next/server';
import {SupabaseClient} from "@supabase/supabase-js";

async function fetchHotTakes(client: SupabaseClient<never, 'public', never>) {
  const {error: hotTakeError, data: hotTakesData} = await client
      .from('hot_take')
      .select();
  const hotTakes: Array<FullHotTake> = hotTakesData!;
  if (hotTakeError) {
    throw new Error('could not process request to fetch hot_take data', hotTakeError);
  }
  return hotTakes;
}

function getUniqueVotes(arr: Array<FullVote>) {
  const seenValues = new Set();
  return arr.filter(obj => {
    const value = obj['full_name_voter'];
    if (seenValues.has(value)) {
      return false;
    }
    seenValues.add(value);
    return true;
  });
}

async function fetchVotes(client: SupabaseClient<never, 'public', never>) {
  const {error: voteError, data: voteData} = await client
      .from('vote')
      .select();
  const votes: Array<FullVote> = voteData!;
  if (voteError) {
    throw new Error('could not process request to fetch vote data', voteError);
  }
  return votes;
}

export async function GET() {

  try {
    const client = await createClient();
    const hotTakes = await fetchHotTakes(client);
    const votes = await fetchVotes(client);

    const results = []

    for(const hotTake of hotTakes){
      const hotTakeVotes = votes.filter((vote)=> vote.hot_take === hotTake.id)
      const uniqueHotTakeVotes = getUniqueVotes(hotTakeVotes)

      const correctVotes = votes.filter((vote)=> {
        return vote.full_name_guess === hotTake.full_name
      })

      const uniqueCorrectVotes = getUniqueVotes(correctVotes)

      const percentage = uniqueHotTakeVotes ? (uniqueCorrectVotes.length / uniqueHotTakeVotes.length) * 100 : 0

      results.push({hot_take: hotTake.hot_take, percentage: percentage, full_name: hotTake.full_name})
    }

    return NextResponse.json({ results });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
