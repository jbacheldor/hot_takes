import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const client = await createClient();
    const req = await request.json();
    console.log('req', req);

    const { error } = await client.from('hot_take').insert(req);
    if (error) {
      throw new Error('could not process request', error);
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
