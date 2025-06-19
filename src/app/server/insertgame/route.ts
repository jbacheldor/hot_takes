import { NextRequest, NextResponse } from 'next/server';
import { db } from 'hottake/db';
import { hotTakeGameTable } from 'hottake/db/schema';

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    if (!title || title.length < 2) {
      return NextResponse.json(
        { error: 'Game must have a title with at least two characters' },
        { status: 400 },
      );
    }
    await db.insert(hotTakeGameTable).values({ title });
    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
