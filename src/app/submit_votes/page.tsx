'use client';
import './Votes.css';
import { useState } from 'react';

type Vote = {
  hot_take: string;
  full_name: string;
}

type SubmitVotes = {
  full_name: string;
  hot_take_game: string;
  votes: Array<Vote>;
};

// TODO bring this from URL param
const hot_take_game_id = '8d1b08be-3aab-4d4f-a95d-41c82397a897';

const initialFormState = {
  full_name: '',
  hot_take_game: hot_take_game_id,
  votes: [],
};

function Votes() {
  const pathName = process.env.BASE_URL
  const [formState, setFormState] = useState<SubmitVotes>(initialFormState);

  const submitVotes = () => {
    const hotTakeData = {
      full_name: `${formState.full_name}`,
      hot_take_game: hot_take_game_id,
      votes: [],
    }
    fetch(`${pathName}/server/submit_votes`, {
      method: 'POST',
      body: JSON.stringify(hotTakeData),
    });
    setFormState(initialFormState);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="hot-container">
      <div className="hot-header">
        <h2>Votes</h2>
        <div>submit your votes</div>
      </div>
      <div className={'hot-body'}>
        <label>
          full name
          <input
            name="full_name"
            value={formState?.full_name}
            onChange={onChangeHandler}
          ></input>
        </label>
        <button onClick={submitVotes}>submit</button>
      </div>
    </div>
  );
}

export default Votes;
