import React from 'react'
import Result from "./Result";

/**
 * Viewable list of Bills that can be selected for AI analysis. 
 * 
 * The search results display at the left half of the page underneath the search bar.
 * 
 * @param {*} results list of results containing *titles, descriptions*, and *summaries*
 *            at the very least.
 */
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