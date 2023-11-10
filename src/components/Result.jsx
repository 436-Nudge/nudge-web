import React, {useState} from 'react'

const Result = ({result}) => {
  const [viewSummary, toggleViewSummary] = useState(false);
  return (
    <div className = "searchResult">
      <h2>{result.short_title}</h2>
      <p><i>{result.bill_id}</i></p>
      <p>Subject: {result.primary_subject}</p>
      <button 
        className='viewSummary'
        onClick={(e)=>{toggleViewSummary(!viewSummary)}}
      >
        {viewSummary ? "Hide" : "Show"} Summary
      </button>
      {
        viewSummary && <p className="result-summary">{result.summary}</p>
      }
    </div>
  )
}

export default Result