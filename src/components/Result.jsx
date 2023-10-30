import React from 'react'

const Result = ({result}) => {
  return (
    <div className = "bill">
      <h2>{result.bill_id}</h2>
      <p>{result.primary_subject}</p>
      <p><i>{result.summary}</i></p>
    </div>
  )
}

export default Result