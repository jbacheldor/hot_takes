import { NextRequest, NextResponse } from 'next/server';
import { getHotTakes, getVotes } from 'hottake/db/schema';
import { HotTake, ResultData, Vote } from 'hottake/types/all';

function getUniqueVotes(arr: Array<Vote>) {
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

export async function GET(req: NextRequest) {
  const game_id = Number(req.nextUrl.searchParams.get('game_id')!);
  let results: Array<ResultData> = [];
  try {
    const hotTakes: Array<HotTake> = await getHotTakes(game_id);
    const votes: Array<Vote> = await getVotes(game_id);

    if (votes.length === 0) {
      return NextResponse.json({ results });
    }

    for (const hotTake of hotTakes) {
      const hotTakeVotes = votes.filter(
        vote => vote.hot_take_id === hotTake.id,
      );
      const uniqueHotTakeVotes = getUniqueVotes(hotTakeVotes);

      const correctVotes = votes.filter(vote => {
        return vote.full_name_guess === hotTake.full_name;
      });

      const uniqueCorrectVotes = getUniqueVotes(correctVotes);

      const percentage =
        uniqueHotTakeVotes.length > 0
          ? (uniqueCorrectVotes.length / uniqueHotTakeVotes.length) * 100
          : 0;

      results.push({
        hot_take: hotTake.hot_take,
        percentage: percentage,
        full_name: hotTake.full_name,
      });
    }

    results = results.sort(
      (a: ResultData, b: ResultData) => b.percentage - a.percentage,
    );

    return NextResponse.json({ results });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json({ results }); // TODO make it return an error again
  }
}
