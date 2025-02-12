'use client';
import './results.css';
import { useEffect, useState } from 'react';
import {SubHeader} from "hottake/components/SubHeader";

type dataType = {
  full_name: string,
  id: number,
  hot_take: string,
  percent?: number,
  vote?: []
}

type resultsType = {
  results: dataType[]
}

const initialData = {
  results: [{full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hot_take: "lorem ipsum or whatevr",
  percent: 100}]
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
        console.log('wjat is data', data.results)
        setData(data)
        setIsLoading(false)
      }catch (e){
        alert('Error baby!!!!')
        console.log(e)
      }

    }
    getData()
  }, [])

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
          {data.results && data.results.map((value, key) => {
            return (
            <div id="resultsrows" key={key}>
              <span className="values">
                {value.full_name}
              </span>
              <span className="hotTake">
                {value.hot_take}
              </span>
              <span className="percent">
                {value.percent ? value.percent : 100}
              </span>
            </div>)
          })}

        </div>

      </div>
    </div>
  );
}

export default Results;
