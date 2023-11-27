import React, {useEffect, useState} from 'react'

/**
 * Single result from searching for legislation, containing the title and a short description,
 * with an option to view a full summary and select it to analyze.
 * 
 * @param {*} result object containing bill information such as title, description, summary, status, etc.
 * @param {*} selectResult function for selecting the specific result
 */

const Result = ({legislation, selectResult}) => {
  const [billInfo, setBillInfo] = useState(null);
  const congressKey = "b6gPYwO1yERKKXfuZ0V68gUS9BQS4zTEr4FTvOe7";

  useEffect(()=>{
    console.log("Getting Bill Info...");
    var httpGet = new XMLHttpRequest();
    let infoURL = "https://api.congress.gov/v3/bill/" + legislation.congress + "/" + legislation.chamber + "/" + legislation.bill + "?api_key=" + congressKey;
    httpGet.open("GET", infoURL, false);
    httpGet.send( null );
    let info = JSON.parse(httpGet.responseText);
    setBillInfo(info.bill);
  }, []);

  return (
    <div className = "searchResult">
      {billInfo 
        ? <>
            <h3>{billInfo.title}</h3>
            <button
              onClick={()=>{selectResult(legislation.id, billInfo)}}
            >
              Select Legislation
            </button>
          </>
        : <p>Loading Legislation</p>
      }
    </div>
  )
}

export default Result