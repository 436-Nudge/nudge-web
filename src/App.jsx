import React, { useState, useEffect, useRef } from 'react'
import './styles/App.css'
import { SearchBar } from './components/SearchBar'
import ResultsList from './components/ResultsList'
import SelectedResult from './components/SelectedResult'
import SelectDemographics from './components/SelectDemographics'

class Legislation {
	constructor(id, congress, chamber, bill) {
		this.id = id;
		this.congress = congress;
		this.chamber = chamber;
		this.bill = bill;
	}
}

const App = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState(null);
  const [isResultSelected, setResultSelected] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedLegislation, setSelectedLegislation] = useState(null);

  const congressKey = "b6gPYwO1yERKKXfuZ0V68gUS9BQS4zTEr4FTvOe7";
  const legislations = [
	new Legislation(1, 118, "hr", 3746),
	new Legislation(2, 116, "hr", 5717),
	new Legislation(3, 117, "hr", 3684),
	new Legislation(4, 118, "hr", 6363)
  ];

  const [aiResponse, setAIResponse] = useState(null);

  const connection = useRef(null);

  // Connect to the server upon startup
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8767');

	// Server is connected
    socket.addEventListener('open', function (event) {
      console.log('Connected to the server');
    });


    socket.addEventListener('message', function (event) {
      try {
          let eventData = JSON.parse(event.data);
          if (eventData && eventData.token) {
              // Session token is received here
            	sendToAI(eventData.token);

          } else if (eventData && eventData.response) {
              // Display the response from the JSON message
              let receivedResponse = eventData.response;

			  setAIResponse(receivedResponse);
              
          }
      } catch (error) {
          console.error('Invalid', error);
      }
  	});

  	connection.current = socket;

  }, [selectedLegislation]);
  


  /**
   * Based on user input filters, searched ProPublica's congress api for
   * 
   * @param {*} search 
   */
  /*
  const submitSearch = (search) => {
    setSearch(search);
    var httpGet = new XMLHttpRequest();
    var key = "1DDfqiBG47iHDqDcWjJn26LV5uB4ztETWH2Lj5eR";
    var status = search.status ? search.status : "enacted";
    var chamber = search.chamber;
    var url = "https://api.propublica.org/congress/v1/" + search.congress+"/"+ chamber + "/bills/" + status + ".json";
    httpGet.open("GET", url, false);
    httpGet.setRequestHeader("X-API-Key",key);
    httpGet.send( null );
    var newResults = JSON.parse(httpGet.responseText);
    console.log(newResults);
    setResults(newResults.results);
  }
  */

  const sendToAI = (token) => {
	console.log(selectedResult);
	if(selectedResult) {
		let docName = selectedLegislation.title;
		let documentJSON = JSON.stringify({
			"token": token, 
			"documents":{
				docName: ""
			},
			"docID": selectedLegislation.id
		});
		connection.current.send(documentJSON);
	}
  }

  const submitDemographics = (demographics) => {
    console.log(demographics);
	let demographicsJSON = JSON.stringify({"demographics":demographics.toString()});
	connection.current.send(demographicsJSON);
	setAIResponse("Awaiting AI Response. . .")
  }

  const selectResult = (legislationID, result) => {
	console.log("Selected Result:");
	console.log(result);
    setResultSelected(true);
    setSelectedResult(result);
	setSelectedLegislation(legislations[legislationID-1]);
	setAIResponse(null);
  }

  const removeSelection = () => {
    setResultSelected(false);
    setSelectedResult(null);
	setSelectedLegislation(null);
	setAIResponse(null);
  }

  return (
    <>
      <div className="header">
        <h1>Nudge</h1>
      </div>
      <div className="main">
        <div className="search">
          {!isResultSelected 
          ? <ResultsList 
            	legislations={legislations}
                selectResult={selectResult}
            />
          :
            <div className = "demographics-view">
              <div>
                <button onClick={() => removeSelection()}>Back to Results</button>
              </div>
              <SelectDemographics submit={submitDemographics}/>
			  {aiResponse && 
			  	<div>
					<p>{aiResponse}</p>
				</div>}
            </div>
          }
        </div>
        <div className="summary">
			{selectedLegislation 
			? <SelectedResult legislation = {selectedLegislation} result={selectedResult}/>
			: <>
				<h2>Legislation Summary</h2>
				<p>Looks like you haven't selected lesgislation.</p>
				<p><em>Click "Select Legislation" on a specific piece of legislation to view a summary and see how it affects you.</em></p>
			</>
			}
        </div>
      </div>
    </>
  )
}

export default App
