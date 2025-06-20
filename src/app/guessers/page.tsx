'use client';
import './results.css';
import React, { useEffect, useState } from 'react';
import { SubHeader } from 'hottake/components/SubHeader';
import { Guessers as GuessersType } from 'hottake/types/all';
import { useSearchParams } from 'next/navigation';

const initialData: GuessersType = [
  {
    full_name: '',
    correct_count: 0,
  },
];

function Guessers() {
  const pathName = process.env.BASE_URL;
  const [guesserData, setGuesserData] = useState<GuessersType>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const game_id = searchParams.get('game_id');

  useEffect(() => {
    const getGuesses = async () => {
      try {
        const res = await fetch(
          `${pathName}/server/guessers?game_id=${game_id}`,
          {
            method: 'GET',
          },
        );
        const resultData = await res.json();
        if (resultData.length !== 0) {
          setGuesserData(resultData);
          setIsLoading(false);
        }
      } catch (e) {
        alert('Error!!!!');
        console.log(e);
      }
    };
    const result = getGuesses();
    console.log(result);

    setIsLoading(false);
  }, []);

  return (
    <div>
      <SubHeader subHeaders={['Guesser', 'count of correct guesses!!!']} />
      <div id="results">
        <div id="data-rows">
          {!isLoading &&
            guesserData.map((value, key) => {
              return (
                <div id="resultsrows" key={key}>
                  <span className="values">{value.full_name}</span>
                  <span className="percent">{value.correct_count}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Guessers;
