'use client';
import './CastVotes.css';
import React, { useEffect, useState } from 'react';
import { HotTakeReturnType, SubmitVotes } from 'hottake/types/all';
import Dropdown from 'hottake/components/Dropdown';
import { redirect } from 'next/navigation';
import { SubHeader } from 'hottake/components/SubHeader';
import { useSearchParams } from 'next/navigation';

const initialFormState = {
  full_name: '',
  hot_take_game_id: 0,
  votes: [],
};

function shuffleNames(array: Array<string>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function CastVotes() {
  const pathName = process.env.BASE_URL;
  const [formState, setFormState] = useState<SubmitVotes>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const game_id = searchParams.get('game_id');

  const [hotTakeData, setHotTakeData] = useState<HotTakeReturnType>({
    full_names: [],
    hot_takes: [],
  });

  useEffect(() => {
    async function getHotTakeData() {
      try {
        const response = await fetch(
          `${pathName}/server/gettakes?game_id=${game_id}`,
          {
            method: 'GET',
          },
        );
        const result = await response.json();

        if (result.full_names.length > 0) {
          const uniqueFullNames = shuffleNames(
            Array.from(new Set(result.full_names)),
          );
          setHotTakeData({ ...result, full_names: uniqueFullNames });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }
    const result = getHotTakeData();
    console.log('getHotTakeData result', result);
    return () => {
      console.log('Component unmounted or effect re-ran');
    };
  }, []);

  const submitVotes = async () => {
    const seenTakes = new Set();
    formState.full_name = formState.full_name.toLowerCase();

    const votes = formState.votes.filter(item => {
      const hotTakeId = item.hot_take_id;
      if (hotTakeId == null || seenTakes.has(hotTakeId)) {
        return false;
      }
      seenTakes.add(hotTakeId);
      return true;
    });

    const result = await fetch(`${pathName}/server/castvotes/`, {
      method: 'POST',
      body: JSON.stringify({ ...formState, votes, hot_take_game_id: game_id }),
    });
    console.log('POST result', result);
    if (result.ok) redirect('/results?game_id=' + game_id);

    setFormState(initialFormState);
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, full_name: e.target.value });
  };

  function updateVotes(hotTakeId: number, guessFullName: string) {
    const votes = formState.votes;
    votes.push({ full_name: guessFullName, hot_take_id: hotTakeId });
    setFormState({ ...formState, votes });
  }

  if (!isLoading && hotTakeData.hot_takes.length === 0) {
    return <></>;
  }

  return (
    <div>
      <SubHeader subHeaders={['Votes! Submit your votes!']} />
      <SubHeader subHeaders={['hot take', 'assumed author']} />
      <div className="hot-body">
        {hotTakeData.hot_takes.map((take, i) => (
          <div key={`hot-take-${i}`} className="hot-take-vote">
            <span className={'hot-span-vote'}>{take.hot_take}</span>
            <Dropdown
              fullNames={hotTakeData.full_names}
              hotTakeId={take.id}
              handleSelect={updateVotes}
            />
          </div>
        ))}
        <hr />
        <div className="submit-votes-row">
          <label>
            <span className="voter-full-name">voter full name: </span>
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
