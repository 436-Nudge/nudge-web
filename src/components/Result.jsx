import React, {useState} from 'react'

/**
 * Single result from searching for legislation, containing the title and a short description,
 * with an option to view a full summary and select it to analyze.
 * 
 * @param {*} result object containing bill information such as title, description, summary, status, etc.
 * @param {*} selectResult function for selecting the specific result
 */
const Result = ({result, selectResult}) => {
  return (
    <div className = "searchResult">
      <h3>{result.short_title}</h3>
      <p><i>{result.bill_id}</i></p>
      <p>Subject: {result.primary_subject}</p>
      <button
        className='select-result'
        onClick={() => selectResult(result)}
      >Select Legislation</button>
    </div>
  )
}

export default Result