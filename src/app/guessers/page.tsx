'use client';
import './results.css';
import { useEffect, useState } from 'react';
import {SubHeader} from "hottake/components/SubHeader";
import {Guessers as GuessersType} from "hottake/types/all";

const initialData =  [
  {
    full_name: "the octopus",
    correct_count: 100000
  }
]



function Guessers() {
  const pathName = process.env.BASE_URL
  const [guesserData, setGuesserData] = useState<GuessersType>(initialData)
  const [isLoading, setIsLoading]= useState(true)

  useEffect(()=> {
    const getGuesses = async () => {
      try {
        const res = await fetch(`${pathName}/server/guessers`, {
          method: 'GET'
        });
        const resultData = await res.json();
        console.log('resultData', resultData)
        setGuesserData(resultData)
        setIsLoading(false)
      }catch (e){
        alert('Error!!!!')
        console.log(e)
      }
    }
    const result = getGuesses()
    console.log(result)

    setIsLoading(false)
  }, [])

  guesserData.sort((a, b) => b.correct_count - a.correct_count)
  console.log("guesserData", guesserData)
  return (
    <div>
      <SubHeader subHeaders={["Guesser", "count of correct guesses!!!"]}/>
      <div id='results'>
        {isLoading}
        <div id='data-rows'>
          {!isLoading && guesserData.map((value, key) => {
            return (
              <div id="resultsrows" key={key}>
              <span className="values">
                {value.full_name}
              </span>
                <span className="percent">
                {value.correct_count}
              </span>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default Guessers;
