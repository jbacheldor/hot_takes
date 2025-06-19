import { NextRequest, NextResponse } from 'next/server';
import { db } from 'hottake/db';
import { voteTable } from 'hottake/db/schema';
import {SubmitVotes} from "hottake/types/all";

export async function POST(req: NextRequest) {
  try {
    const submitData: SubmitVotes = await req.json();
    for (const vote of submitData.votes) {
      const voteData = {
        hot_take_id: vote.hot_take_id!,
        hot_take_game_id: submitData.hot_take_game_id,
        full_name_voter: submitData.full_name!,
        full_name_guess: vote.full_name!,
      };
      console.log('data to insert', voteData);
      await db.insert(voteTable).values(voteData);
    }
    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: 'HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
