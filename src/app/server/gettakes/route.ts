import { NextResponse } from 'next/server';
import { hotTakeTable } from 'hottake/db/schema';
import { db } from 'hottake/db';

export async function GET() {
  try {
    // TODO: filter by hot_take_game_id
    const data = await db.select().from(hotTakeTable);
    const full_names: Array<string> = data.map(take => take.full_name!);
    return NextResponse.json({ hot_takes: data, full_names });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch hot takes' },
      { status: 500 },
    );
  }
}
