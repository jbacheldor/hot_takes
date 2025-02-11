'use client';
import './results.css';
import { useState } from 'react';

type dataType = {
  full_name: string,
  id: number,
  hotTake: string,
  percent: number,
}

type resultsType = {
  data: dataType[]
}

const initialData = {
  data: [{full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or lorem ipsum or whatevr lorem ipsum or whatevr lorem ipsum or whatevr  lorem ipsum or whatevr whatevr lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100},
  {full_name: "eggs baby",
  id: 0,
  hotTake: "lorem ipsum or whatevr",
  percent: 100}]
}


function Results() {
  // const pathName = process.env.BASE_URL
  const [data, setData] = useState<resultsType>(initialData)

  const test = () => {
    setData(initialData)
  }

  return (
    <div className="results-container">
      <span id='mainTitle'>
      HOT ONES (the ones being takes)
      </span>
      <hr/>
      <div id='resultsHeader'>
        <span className="headers">Performance Eval!!</span>
        <span className="headers">% accucracy!!!</span>
      </div>
      <hr/>
      <div id='results'>
        <div id='columnheaders'>
          <span className="headers">actual</span>
          <span className="headers">spicy spicy takes</span>
          <span className="headers">percent</span>
        </div>
        <div id='data-rows'>
          {data.data && data.data.map((value, key) => {
            return (
            <div id="resultsrows" key={key}>
              <span className="values">
                {value.full_name}
              </span>
              <span className="hotTake">
                {value.hotTake}
              </span>
              <span className="values" onClick={test}>
                {value.percent}
              </span>
            </div>)
          })}

        </div>

      </div>
    </div>
  );
}

export default Results;
