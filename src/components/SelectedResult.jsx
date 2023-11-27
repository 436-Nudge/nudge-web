import React, { useEffect, useState } from 'react'

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
const SelectedResult = ({legislation, result}) => {

  const [billSummary, setBillSummary] = useState(null);
  const congressKey = "b6gPYwO1yERKKXfuZ0V68gUS9BQS4zTEr4FTvOe7";

  useEffect(()=> {
    console.log("Getting Bill Summary...");
    var httpGet = new XMLHttpRequest();
    let infoURL = "https://api.congress.gov/v3/bill/" + legislation.congress + "/" + legislation.chamber + "/" + legislation.bill + "/summaries?api_key=" + congressKey;
    httpGet.open("GET", infoURL, false);
    httpGet.send( null );
    let info = JSON.parse(httpGet.responseText);
    console.log(info)
    setBillSummary(info);
  }, []);

  return (
    <div className = "selected-legislation">
        <h2>Legislation Summary</h2>
        {billSummary && legislation && <>
          <h3>{result.title}</h3>
          <p><i>Congress {result.congress} : {result.originChamber} bill {result.number}</i></p>
          <div dangerouslySetInnerHTML={{__html: billSummary.summaries[billSummary.summaries.length-1].text}}></div>
        </>}
    </div>
  )
}

export default SelectedResult