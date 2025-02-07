'use client';
import './CreateHotTake.css';
import { useState } from 'react';

type CreateHotTake = {
  first_name: string;
  last_name: string;
  hot_take_game: string;
  hot_take: string;
};

// TODO bring this from URL param
const hot_take_game_id = '8d1b08be-3aab-4d4f-a95d-41c82397a897';

const initalFormState = {
  first_name: '',
  last_name: '',
  hot_take_game: hot_take_game_id,
  hot_take: '',
};

function HotTakes({ gameId }: { gameId: string }) {
  const [formState, setFormState] = useState<CreateHotTake>(initalFormState);
  console.log('gameId', gameId);

  const insertHotTake = () => {
    fetch('http://localhost:3000/server/inserthottake', {
      method: 'POST',
      body: JSON.stringify(formState),
    });
    setFormState(initalFormState);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="hot-container">
      <div className="hot-header">
        <h2>Hot Takes</h2>
        <div>submit your hot take here</div>
      </div>
      <div className={'hot-body'}>
        <label>
          hot take
          <input
            name="hot_take"
            value={formState?.hot_take}
            onChange={onChangeHandler}
          ></input>
        </label>
        <label>
          first name
          <input
            name="first_name"
            value={formState?.first_name}
            onChange={onChangeHandler}
          ></input>
        </label>
        <label>
          last name
          <input
            name="last_name"
            value={formState?.last_name}
            onChange={onChangeHandler}
          ></input>
        </label>
        <label>
          name<input></input>
        </label>
        <button onClick={insertHotTake}>submit</button>
      </div>
    </div>
  );
}

export default HotTakes;
