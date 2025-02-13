'use client';
import './CreateHotTake.css';
import { useState } from 'react';
import {BaseHotTake} from "hottake/types/all";
import {SubHeader} from "hottake/components/SubHeader";

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
  const [warning, setWarning]= useState(false)

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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.name == 'hot_take' && e.target.value.length > 500){
      setWarning(true)
    }
    else if (e.target.name == 'hot_take' && e.target.value.length < 500){
      setWarning(false)
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
    else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
        <SubHeader subHeaders={["submit your hot take here"]}/>
      <div className='hot-body'>
        <label>
          <span>hot take</span>
          {warning && 
            <span id='warnings'>u do not need more than 500 characters </span>
          }
          <textarea  id='hot_take_input'
            name="hot_take"
            value={formState?.hot_take}
            onChange={onChangeHandler}
            maxLength={500}
          ></textarea>
        </label>
        <label>
          <span>full name</span>
          <input id='hot_take_name'
            name="full_name"
            value={formState?.full_name}
            onChange={onChangeHandler}
            maxLength={50}
          ></input>
        </label>
        <hr id="submit-hr"/>
      <span>no more submissions - it's go time folks</span>
        <button disabled >submit</button>
      </div>
    </div>
  );
}

export default HotTakes;
