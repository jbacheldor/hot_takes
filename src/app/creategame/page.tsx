'use client';
import './CreateGame.css';
import { useState } from 'react';
import { BaseGame } from 'hottake/types/all';
import { SubHeader } from 'hottake/components/SubHeader';
import { useRouter } from 'next/navigation';

const initalFormState = {
  title: '',
  voting_live_at: new Date().toISOString(),
  completed_at: new Date(new Date().getTime()+ 1000 * 60 * 10).toISOString(),
};

function Game() {
  const router = useRouter();
  const pathName = process.env.BASE_URL;
  const [formState, setFormState] = useState<BaseGame>(initalFormState);

  const createGame = async () => {
    const hotTakeData = {
      title: formState.title.toLowerCase(),
      voting_live_at: formState.voting_live_at,
      completed_at: formState.completed_at
    };
    const result = await fetch(`${pathName}/server/game`, {
      method: 'POST',
      body: JSON.stringify(hotTakeData),
    });
    setFormState(initalFormState);
    const result_json = await result.json();
    router.push('/createhottake?game_id=' + result_json.hot_take_game_id);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.id == 'game_title' && e.target.value.length > 50) {
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <SubHeader subHeaders={['create a new game']} />
      <div className="hot-body">
        <label>
          <span>title</span>
          <input
            id="game_title"
            name="title"
            value={formState?.title}
            onChange={onChangeHandler}
            maxLength={50}
          ></input>
        </label>
        <hr id="submit-hr" />
        <button onClick={createGame}>submit</button>
      </div>
    </div>
  );
}

export default Game;
