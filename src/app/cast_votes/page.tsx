'use client';
import './CastVotes.css';
import React, {useEffect, useState} from 'react';
import {HotTakeReturnType, SubmitVotes} from "hottake/types/all";
import Dropdown from "hottake/components/Dropdown";

// TODO bring this from URL param
const hot_take_game_id = '8d1b08be-3aab-4d4f-a95d-41c82397a897';

const initialFormState = {
  full_name: '',
  hot_take_game: hot_take_game_id,
  votes: [],
};


function CastVotes() {
  const pathName = process.env.BASE_URL
  const [formState, setFormState] = useState<SubmitVotes>(initialFormState);


  const [hotTakeData, setHotTakeData] = useState<HotTakeReturnType>({full_names: [], hot_takes: []});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function getHotTakeData() {
      try {
        const response = await fetch(`${pathName}/server/get_takes`, {
            method: 'GET',
        });
        const result = await response.json();
        setHotTakeData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    const result = getHotTakeData();
    console.log('getHotTakeData result', result)
    return () => {
      console.log('Component unmounted or effect re-ran');
    };
  }, []);

  const submitVotes = () => {
    const seenTakes = new Set();
    const votes = formState.votes.filter(item => {
      const hotTake = item.hot_take
      if (hotTake === "" || seenTakes.has(hotTake)) {
        return false;
      }
      seenTakes.add(hotTake);
      return true;
    });

    const result = fetch(`${pathName}/server/cast_votes/`, {
      method: 'POST',
      body: JSON.stringify({...formState, votes}),
    });
    console.log('POST result', result)
    setFormState(initialFormState);
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, full_name: e.target.value });
  };

  function updateVotes(hotTakeId: string, guessFullName: string) {
    const votes =  formState.votes
    votes.push({full_name: guessFullName, hot_take: hotTakeId})
    setFormState({ ...formState, votes});
  }

  return (
    <div className="hot-container">
      <div className="hot-header">
        <h2>Votes</h2>
        <hr />
        <div>submit your votes</div>
      </div>
      <div className={'hot-body'}>
        <label>
          full name
          <input
              name="full_name"
              value={formState?.full_name}
              onChange={onFullNameChange}
          ></input>
        </label>
        <hr/>
        <div id='columnheaders'>
          <span className="headers">name</span>
          <span className="headers">hot take</span>
        </div>
        <hr/>
        {
          isLoading ? <>loading</> : hotTakeData.hot_takes.map((take, i) =>
              <div key={i} className="hot-take-vote">
                <span className={'hot-span-vote'}>{take.hot_take}</span>
                <Dropdown fullNames={hotTakeData.full_names} hotTakeId={take.id}
                          handleSelect={updateVotes}/>
              </div>)
        }
        <button onClick={submitVotes}>submit</button>
      </div>
    </div>
  );
}

export default CastVotes;
