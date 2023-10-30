import React from 'react'
import Result from "./Result";

const ResultsList = ({results}) => {
  return (
    <div className='searchResults'>
    {results.bills.map((result) => {
        return <Result key = {result.bill_id} result={result}/>
      })
    }
    </div>
  )
}

export default ResultsList