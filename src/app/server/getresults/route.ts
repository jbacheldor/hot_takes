import { NextResponse } from 'next/server';
import { hotTakeTable, voteTable } from 'hottake/db/schema';
import { db } from 'hottake/db';
import { HotTake, Vote } from 'hottake/types/all';

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

export async function GET() {
  try {
    // TODO: filter by hot_take_game_id
    const hotTakes: Array<HotTake> = await db.select().from(hotTakeTable);
    const votes: Array<Vote> = await db.select().from(voteTable);

    const results = [];

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

    return NextResponse.json({ results });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
