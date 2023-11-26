import React, {useState} from 'react'

/**
 * Single result from searching for legislation, containing the title and a short description,
 * with an option to view a full summary and select it to analyze.
 * 
 * @param {*} result object containing bill information such as title, description, summary, status, etc.
 */
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