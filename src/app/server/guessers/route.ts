import { NextResponse } from 'next/server';
import { Guesser, Guessers, HotTake, Vote } from 'hottake/types/all';
import { hotTakeTable, voteTable } from 'hottake/db/schema';
import { db } from 'hottake/db';

function getUniqueVoterNames(arr: Array<Vote>) {
  return [...new Set(arr.map(item => item['full_name_voter']))];
}

function getCorrectCount(
  voterFullName: string,
  hotTakeMap: Map<number, HotTake>,
  votes: Array<Vote>,
) {
  const voterVotes = votes?.filter(
    vote => vote.full_name_voter === voterFullName,
  );
  let correctCount = 0;
  for (const vote of voterVotes) {
    const hotTakeId = vote.hot_take_id;
    if (!hotTakeMap.has(hotTakeId)) {
      continue;
    }
    const hotTake = hotTakeMap.get(hotTakeId);
    if (hotTake === undefined) {
      continue;
    }
    if (hotTake.full_name === vote.full_name_guess) {
      correctCount += 1;
    }
  }
  return correctCount;
}

export async function GET() {
  try {
    // TODO: filter by hot_take_game_id
    const hotTakes: Array<HotTake> = await db.select().from(hotTakeTable);
    const votes: Array<Vote> = await db.select().from(voteTable);
    const uniqueVoterNames = getUniqueVoterNames(votes);
    const hotTakeMap: Map<number, HotTake> = new Map(
      hotTakes.map(hotTake => [hotTake.id, hotTake]),
    );
    const results: Guessers = new Array<Guesser>();

    for (const voterFullName of uniqueVoterNames) {
      const correctCount = getCorrectCount(voterFullName, hotTakeMap, votes);
      results.push({ full_name: voterFullName, correct_count: correctCount });
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
