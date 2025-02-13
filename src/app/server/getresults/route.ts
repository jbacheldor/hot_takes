import { createClient } from 'hottake/app/server/datastoreclient';
import { FullHotTake, FullVote } from 'hottake/types/all';

import { NextResponse } from 'next/server';

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
    const hotTakes = await fetchHotTakes(client);
    const votes = await fetchVotes(client);

    const hotTaketoAuthorName: Map<string, string> = new Map(hotTakes.map((hotTake) => [hotTake.id, hotTake.full_name]));

    console.log('hot take to author name', hotTaketoAuthorName)
    console.log("all the vots??", votes)
    // hotTaketoAuthorName.get()

    const results = []

    for(const hotTake of hotTakes){
      console.log("hot hot take", hotTake)
      console.log("hot take id ", hotTake.id)
      const hotTakeVotes = votes.filter((vote)=> vote.hot_take === hotTake.id)
      console.log("hotTakes Votes", hotTakeVotes)
      const countOfVotes = hotTakeVotes.length + 1
      console.log("countOfVotes", countOfVotes)
      const correctVotes = votes.filter((vote)=> vote.full_name_guess === hotTake.full_name)
      console.log("number of correct votes", correctVotes )
      let percentage = correctVotes.length / countOfVotes
      // console.log("percentage", percentage)
      // console.log("countOfVotes", countOfVotes)
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
