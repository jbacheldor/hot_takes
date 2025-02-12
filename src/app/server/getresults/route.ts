import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';

export async function GET() {

  try {
    const client = await createClient();
    const { error, data: results } = await client
      .from('hot_take')
      // .select(`full_name, hot_take, id, hot_take_game, vote (hot_take, full_name_guess, hot_take_game)`);
      .select(`full_name, hot_take, id, vote (hot_take, full_name_guess, hot_take_game)`);

    if (error) {
      throw new Error('could not process request', error);
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
