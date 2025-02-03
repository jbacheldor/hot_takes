import { createClient } from 'hottake/app/server/datastoreclient';

export default async function HotTakes() {
  const supabase = await createClient();
  const { data: hot_takes } = await supabase.from("hot_take_game").select();

  return <pre>{JSON.stringify(hot_takes, null, 2)}</pre>
}

