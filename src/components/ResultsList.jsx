import React from 'react'
import Result from "./Result";

const ResultsList = ({results}) => {
  return (
    <>
    {results.bills.map((result) => {
        return <Result key = {result.bill_id} result={result}/>
      })
    }
    </>
  )
}

export default ResultsList