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
const ResultsList = ({legislations, selectResult}) => {
  return (
    <div className='searchResults'>
      {legislations.map(legislation => {
        return (<Result
          key = {legislation.id} 
          legislation={legislation}
          selectResult={selectResult}
        />
        )
      })}
    </div>
  )
}

export default ResultsList