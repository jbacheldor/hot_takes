import { NextRequest, NextResponse } from 'next/server';
import { getHotTakes, hotTakeTable } from 'hottake/db/schema';
import { db } from 'hottake/db';

export async function GET(req: NextRequest) {
  const game_id = Number(req.nextUrl.searchParams.get('game_id')!);
  try {
    const hot_takes = await getHotTakes(game_id);
    const full_names: Array<string> = hot_takes.map(take => take.full_name!);
    return NextResponse.json({ hot_takes, full_names });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch hot takes' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { full_name, hot_take_game_id, hot_take } = await req.json();

    if (!full_name || full_name.length < 2) {
      return NextResponse.json(
        { error: 'full_name must be at least two characters' },
        { status: 400 },
      );
    }

    if (!hot_take || hot_take.length < 2) {
      return NextResponse.json(
        { error: 'hot_take must be at least two characters' },
        { status: 400 },
      );
    }

    if (!hot_take_game_id || hot_take_game_id.length < 1) {
      return NextResponse.json(
        { error: 'hot_take_game_id must be populated' },
        { status: 400 },
      );
    }

    await db
      .insert(hotTakeTable)
      .values({ full_name, hot_take_game_id, hot_take });
    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.log('hark an error is occurring', e);
    return NextResponse.json(
      { error: 'HARK internal server error, no!!!!' },
      { status: 500 },
    );
  }
}
