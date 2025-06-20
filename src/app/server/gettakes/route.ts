import { NextRequest, NextResponse } from 'next/server';
import { getHotTakes } from 'hottake/db/schema';

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
