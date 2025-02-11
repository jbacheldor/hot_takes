// import { createClient } from 'hottake/app/server/datastoreclient';

// import { NextResponse } from 'next/server';

// export async function GET() {

//   try {
//     const client = await createClient();
//     const { error, data: hot_takes } = await client
//       .from('hot_take')
//       .select(`full_name, hot_take, id, 
//       votes (hot_take, full_name as guess_name)`);

//     //   need average of all 

//     if (error) {
//       throw new Error('could not process request', error);
//     }
//     // const full_names: Array<string> = hot_takes.map(take => take.full_name );

// //     return NextResponse.json({ hot_takes, full_names });
// //   } catch (e) {
// //     console.log('hark an error is occurring', e);
// //     return NextResponse.json(
// //       { error: ' HARK internal server error, no!!!!' },
// //       { status: 500 },
// //     );
//   }
// }


import { createClient } from 'hottake/app/server/datastoreclient';

import { NextResponse } from 'next/server';

export async function GET() {

  try {
    const client = await createClient();
    const { error, data: hot_takes } = await client
      .from('hot_take')
      .select();

    if (error) {
      throw new Error('could not process request', error);
    }
    const full_names: Array<string> = hot_takes.map(take => take.full_name );

    return NextResponse.json({ hot_takes, full_names });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
