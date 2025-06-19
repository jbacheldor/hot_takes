import { NextResponse } from 'next/server';
import { hotTakeGameTable } from 'hottake/db/schema';
import { db } from 'hottake/db';

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
