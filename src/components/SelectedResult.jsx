import React from 'react'

/**
 * SelectedResult shows the legislation selected by the user after searching for bills.
 * It shows a more detailed view of the bill including a full summary. 
 * 
 * When a bill is not selected, it shows a prompt for users to search and select a bill 
 * to view.
 * 
 * @param {*} result object containing information about a specific piece of legislation,
 * including title, description, status, summary, etc. 
 */
const SelectedResult = ({result}) => {
  return (
    <div className = "selected-legislation">
        <h2>Legislation Summary</h2>
        {result 
            ? <>
                <h2>{result.short_title}</h2>
                <h3>AKA {result.title}</h3>
                <p><i>{result.bill_id}</i></p>
                <p>Subject: {result.primary_subject}</p>
                <p>{result.summary}</p>
            </>
            : <>
                <p>Looks like you haven't selected lesgislation.</p>
                <p><em>Click "Select Bill" on legislation to learn more.</em></p>
            </>
        }
    </div>
  )
}

export default SelectedResult