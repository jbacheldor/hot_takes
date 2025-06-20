'use client';
import './results.css';
import { useEffect, useState } from 'react';
import { SubHeader } from 'hottake/components/SubHeader';
import { useSearchParams } from 'next/navigation';
import { ResultsContainer } from 'hottake/types/all';

const initialData = {
  results: [{ full_name: '', hot_take: '', percentage: 0 }],
};

function Results() {
  const pathName = process.env.BASE_URL;
  const [data, setData] = useState<ResultsContainer>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const game_id = searchParams.get('game_id')!;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `${pathName}/server/getresults?game_id=${game_id}`,
          {
            method: 'GET',
          },
        );
        const data = await res.json();
        if (data && data.results.length > 0) {
          setData(data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    setIsLoading(false);
  }, []);

  if (!isLoading && data.results.length === 0) {
    return (
      <>
        <SubHeader subHeaders={['Performance Eval!!', '% accuracy!!!']} />
      </>
    );
  }

  return (
    <div>
      <SubHeader subHeaders={['Performance Eval!!', '% accuracy!!!']} />
      <div id="results">
        <div id="columnheaders">
          <span className="headers">actual</span>
          <span className="headers">spicy spicy takes</span>
          <span className="headers">percent</span>
        </div>
        {isLoading}
        <div id="data-rows">
          {data.results &&
            data.results.map((value, key) => {
              return (
                <div id="resultsrows" key={key}>
                  <span className="values">{value.full_name}</span>
                  <span className="hotTake">{value.hot_take}</span>
                  <span className="percent">
                    {value.percentage ? Math.round(value.percentage) : 0}%
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Results;
