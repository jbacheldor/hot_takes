import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';

// export const revalidate = 60;

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

/*

length(take) >= 10 AND length(take) < 500
length(first_name) >= 1 AND length(first_name) < 100
length(last_name) >= 1 AND length(last_name) < 100

 */
