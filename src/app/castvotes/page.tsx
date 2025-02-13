'use client';
import './CastVotes.css';
import React, {useEffect, useState} from 'react';
import {HotTakeReturnType, SubmitVotes} from "hottake/types/all";
import Dropdown from "hottake/components/Dropdown";
import {redirect} from "next/navigation";
import {SubHeader} from "hottake/components/SubHeader";

// TODO bring this from URL param
const hot_take_game_id = '8d1b08be-3aab-4d4f-a95d-41c82397a897';

const initialFormState = {
  full_name: '',
  hot_take_game: hot_take_game_id,
  votes: [],
};

function shuffleNames(array: Array<string>){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};



function CastVotes() {
  const pathName = process.env.BASE_URL
  const [formState, setFormState] = useState<SubmitVotes>(initialFormState);


  const [hotTakeData, setHotTakeData] = useState<HotTakeReturnType>({full_names: [], hot_takes: []});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function getHotTakeData() {
      try {
        const response = await fetch(`${pathName}/server/gettakes`, {
            method: 'GET',
        });
        const result = await response.json();
        const uniqueFullNames = shuffleNames(Array.from(new Set(result.full_names)));
        setHotTakeData({...result, full_names: uniqueFullNames});
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

  const submitVotes = async () => {
    const seenTakes = new Set();
    formState.full_name = formState.full_name.toLowerCase();

    const votes = formState.votes.filter(item => {
      const hotTake = item.hot_take
      if (hotTake === "" || seenTakes.has(hotTake)) {
        return false;
      }
      seenTakes.add(hotTake);
      return true;
    });

    const result = await fetch(`${pathName}/server/castvotes/`, {
      method: 'POST',
      body: JSON.stringify({...formState, votes}),
    });
    console.log('POST result', result)
    if (result.ok) redirect('/results')

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
    <div>
      <SubHeader subHeaders={["Votes! Submit your votes!"]}/>
      <SubHeader subHeaders={["hot take", "assumed author"]}/>
      <div className='hot-body'>
        {
          isLoading ? <>loading</> : hotTakeData.hot_takes.map((take, i) =>
              <div key={`hot-take-${i}`} className="hot-take-vote">
                <span className={'hot-span-vote'}>{take.hot_take}</span>
                <Dropdown fullNames={hotTakeData.full_names} hotTakeId={take.id}
                          handleSelect={updateVotes}/>
              </div>)
        }
        <hr/>
        <div className="submit-votes-row">
        <label>
          <span className='voter-full-name'>voter full name: </span>
          <input
              name="full_name"
              value={formState?.full_name}
              onChange={onFullNameChange}
          ></input>
        </label>
        <button onClick={submitVotes}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default CastVotes;
