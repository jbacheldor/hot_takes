'use client';
import './CreateHotTake.css';
import { useState } from 'react';
import { BaseHotTake } from 'hottake/types/all';
import { SubHeader } from 'hottake/components/SubHeader';
import { useSearchParams } from 'next/navigation';

const initialFormState = {
  full_name: '',
  hot_take_game_id: 0,
  hot_take: '',
};

function HotTakes() {
  const pathName = process.env.BASE_URL;
  const [formState, setFormState] = useState<BaseHotTake>(initialFormState);
  const [warning, setWarning] = useState(false);
  const searchParams = useSearchParams();
  const game_id = searchParams.get('game_id')!;

  const insertHotTake = () => {
    const hotTakeData = {
      full_name: formState.full_name.toLowerCase(),
      hot_take_game_id: game_id,
      hot_take: formState.hot_take,
    };
    fetch(`${pathName}/server/hot_takes`, {
      method: 'POST',
      body: JSON.stringify(hotTakeData),
    });
    setFormState(initialFormState);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name == 'hot_take' && e.target.value.length > 500) {
      setWarning(true);
    } else if (e.target.name == 'hot_take' && e.target.value.length < 500) {
      setWarning(false);
      setFormState({ ...formState, [e.target.name]: e.target.value });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <SubHeader subHeaders={['submit your hot take here']} />
      <div className="hot-body">
        <label>
          <span>hot take</span>
          {warning && (
            <span id="warnings">u do not need more than 500 characters </span>
          )}
          <textarea
            id="hot_take_input"
            name="hot_take"
            value={formState?.hot_take}
            onChange={onChangeHandler}
            maxLength={500}
          ></textarea>
        </label>
        <label>
          <span>full name</span>
          <input
            id="hot_take_name"
            name="full_name"
            value={formState?.full_name}
            onChange={onChangeHandler}
            maxLength={50}
          ></input>
        </label>
        <hr id="submit-hr" />
        <button onClick={insertHotTake}>submit</button>
      </div>
    </div>
  );
}

export default HotTakes;
