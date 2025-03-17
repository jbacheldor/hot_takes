import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await createClient();
    const { error, data: hot_takes } = await client
      .from('hot_take_game')
      .select();

    if (error) {
      throw new Error('could not process request', error);
    }
    return NextResponse.json({ hot_takes });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
