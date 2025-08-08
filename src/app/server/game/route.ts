import { NextRequest, NextResponse } from 'next/server';
import { db } from 'hottake/db';
import { hotTakeGameTable } from 'hottake/db/schema';

export async function POST(req: NextRequest) {
  try {
    const { title, voting_live_at, completed_at } = await req.json();

    if (!title || title.length < 2) {
      return NextResponse.json(
        { error: 'Game must have a title with at least two characters' },
        { status: 400 },
      );
    }
    const result = await db
      .insert(hotTakeGameTable)
      .values({ title, voting_live_at, completed_at })
      .returning({ id: hotTakeGameTable.id });
    return NextResponse.json({
      message: 'success',
      hot_take_game_id: result[0].id,
    });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: ' HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const data = await db.select().from(hotTakeGameTable);
    return NextResponse.json({ hot_takes: data });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch winners' },
      { status: 500 },
    );
  }
}
