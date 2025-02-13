'use client';
import './results.css';
import { useEffect, useState } from 'react';
import {SubHeader} from "hottake/components/SubHeader";

type dataType = {
  full_name: string,
  hot_take: string,
  percentage: number,
}

type resultsType = {
  results: dataType[]
}
const initialData = {
  results: [{full_name: "",
  hot_take: "",
  percentage: 0},
  {full_name: "",
  hot_take: "",
  percentage: 0},
  {full_name: "",
  hot_take: "",
  percentage: 0},
  {full_name: "",
  hot_take: "",
  percentage: 0}]
}

function Results() {
  const pathName = process.env.BASE_URL
  const [data, setData] = useState<resultsType>(initialData)
  const [isLoading, setIsLoading]= useState(true)

  useEffect(()=> {
    const getData = async () => {
      try {
        const res = await fetch(`${pathName}/server/getresults`, {
          method: 'GET'
        });
        const data = await res.json();
        setData(data)
        setIsLoading(false)
      }catch (e){
        alert('Error!!!!')
        console.log(e)
      }

    }
    getData()
  }, [])

  const results = data.results.sort((a: dataType, b: dataType) => b.percentage - a.percentage)
  return (
    <div>
      <SubHeader subHeaders={["Performance Eval!!", "% accuracy!!!"]}/>
      <div id='results'>
        <div id='columnheaders'>
          <span className="headers">actual</span>
          <span className="headers">spicy spicy takes</span>
          <span className="headers">percent</span>
        </div>
        {isLoading}
        <div id='data-rows'>
          {results && results.map((value, key) => {
            return (
            <div id="resultsrows" key={key}>
              <span className="values">
                {value.full_name}
              </span>
              <span className="hotTake">
                {value.hot_take}
              </span>
              <span className="percent">
                {value.percentage ? Math.round(value.percentage) : 0}%
              </span>
            </div>)
          })}

        </div>

      </div>
    </div>
  );
}

export default Results;
