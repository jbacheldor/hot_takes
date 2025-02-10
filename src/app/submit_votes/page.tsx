'use client';
import './Votes.css';
import {useEffect, useState} from 'react';
import {HotTakeReturnType, SubmitVotes} from "hottake/types/all";
import Dropdown from "hottake/components/Dropdown";

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


  const [hotTakeData, setHotTakeData] = useState<HotTakeReturnType>({full_names: [], hot_takes: []});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // This effect runs after the component renders
    console.log('using effect');
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
    getHotTakeData();
    return () => {
      console.log('Component unmounted or effect re-ran');
    };
  }, []);

  const submitVotes = () => {
    const hotTakeData = {
      full_name: `${formState.full_name}`,
      hot_take_game: hot_take_game_id,
      votes: [],
    }
    fetch(`${pathName}/server/submit_votes/`, {
      method: 'POST',
      body: JSON.stringify(hotTakeData),
    });
    setFormState(initialFormState);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  function updateVotes(hotTakeId: string, guessFullName: string) {
    // should juyst update the state and then submit votes will use it to hit server
    console.log('hotTakeId', hotTakeId);
    console.log('guessFullName', guessFullName);
  }

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
        {
          isLoading ? <>loading</> : hotTakeData.hot_takes.map((take, i) => <div key={i}><p>{take.hot_take}</p><Dropdown fullNames={hotTakeData.full_names} hotTakeId={take.id} handleSelect={ updateVotes} /></div>)
        }

        <button onClick={submitVotes}>submit</button>
      </div>
    </div>
  );
}

export default Votes;
