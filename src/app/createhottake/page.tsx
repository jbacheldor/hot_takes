'use client';
import './CreateHotTake.css';
import { useState } from 'react';
import {BaseHotTake} from "hottake/types/all";




// TODO bring this from URL param
const hot_take_game_id = '8d1b08be-3aab-4d4f-a95d-41c82397a897';

const initalFormState = {
  full_name: '',
  hot_take_game: hot_take_game_id,
  hot_take: '',
};

function HotTakes() {
  const pathName = process.env.BASE_URL
  const [formState, setFormState] = useState<BaseHotTake>(initalFormState);

  const insertHotTake = () => {
    const hotTakeData = {
      full_name: formState.full_name.toLowerCase(),
      hot_take_game: hot_take_game_id,
      hot_take: formState.hot_take,
    }
    fetch(`${pathName}/server/inserthottake`, {
      method: 'POST',
      body: JSON.stringify(hotTakeData),
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
          full name
          <input
            name="full_name"
            value={formState?.full_name}
            onChange={onChangeHandler}
          ></input>
        </label>
        <button onClick={insertHotTake}>submit</button>
      </div>
    </div>
  );
}

export default HotTakes;
