import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';
import { SubmitVotes } from 'hottake/types/all';

export async function POST(request: Request) {
  try {
    const client = await createClient();
    const req: SubmitVotes = await request.json();

    console.log('req', req);

    for(let i=0; i<req.votes.length; i++){
      const voteData = {
        hot_take: req.votes[i].hot_take,
        hot_take_game: req.hot_take_game,
        full_name_voter: req.full_name,
        full_name_guess: req.votes[i].full_name
      }

      console.log('data to insert', voteData)

      const { error } = await client.from('vote').insert(voteData);
      if (error) {
        throw new Error('could not process request', error);
      }

    }

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
