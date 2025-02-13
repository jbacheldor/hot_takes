import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';
import {FullHotTake, FullVote} from 'hottake/types/all';
import {SupabaseClient} from "@supabase/supabase-js";
import {Guesser, Guessers} from "hottake/types/all";


function getUniqueVoterNames(arr: Array<FullVote>) {
  return [...new Set(arr.map(item => item['full_name_voter']))];
}

function getCorrectCount(voterFullName: string, hotTakeMap: Map<string, FullHotTake>, votes: Array<FullVote>) {
  const voterVotes = votes?.filter((vote) => vote.full_name_voter === voterFullName);
  let correctCount = 0;
  for (const vote of voterVotes) {
    const hotTakeId = vote.hot_take;
    if (!hotTakeMap.has(hotTakeId)) {
      continue;
    }
    const hotTake = hotTakeMap.get(hotTakeId);
    if (hotTake === undefined) {
      continue
    }
    if (hotTake.full_name === vote.full_name_guess) {
      correctCount += 1
    }
  }
return correctCount;
}

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
    const hotTakes = await fetchHotTakes(client)
    const votes = await fetchVotes(client);
    const uniqueVoterNames = getUniqueVoterNames(votes)
    const hotTakeMap: Map<string, FullHotTake> = new Map(hotTakes.map((hotTake) => [hotTake.id, hotTake]));
    const results: Guessers = new Array<Guesser>()

    for (const voterFullName of uniqueVoterNames) {
      const correctCount = getCorrectCount(voterFullName, hotTakeMap, votes);
      results.push({full_name: voterFullName, correct_count: correctCount})
    }
    return NextResponse.json(results);
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
