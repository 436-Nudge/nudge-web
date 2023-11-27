import React, { useState, useEffect, useRef } from 'react'
import './styles/App.css'
import { SearchBar } from './components/SearchBar'
import ResultsList from './components/ResultsList'
import SelectedResult from './components/SelectedResult'
import SelectDemographics from './components/SelectDemographics'

const App = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState(null);
  const [isResultSelected, setResultSelected] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const [aiResponse, setAIResponse] = useState(null);

  const connection = useRef(null);
  const receivedToken = useRef(null);

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
            	receivedToken.current = eventData.token;
				if(selectedResult) {
					let title = selectedResult.title;
					let summary = selectedResult.summary;
					let documentJSON = JSON.stringify({
						"token": receivedToken.current, 
						"documents":
							{
								title: summary
						}
					});
					connection.current.send(documentJSON);
				}

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

  }, []);

  /**
   * Based on user input filters, searched ProPublica's congress api for
   * 
   * @param {*} search 
   */
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


  const submitDemographics = (demographics) => {
    console.log(demographics);
	let demographicsJSON = JSON.stringify({"demographics":demographics.toString()});
	connection.current.send(demographicsJSON);
	setAIResponse("Awaiting AI Response. . .")
  }

  const selectResult = (result) => {
    setResultSelected(true);
    setSelectedResult(result);
  }

  const removeSelection = () => {
    setResultSelected(false);
    setSelectedResult(null);
  }

  return (
    <>
      <div className="header">
        <h1>Nudge</h1>
      </div>
      <div className="main">
        <div className="search">
          {!isResultSelected 
          ? <>
              <SearchBar submitSearch={submitSearch}/>
              {results &&
                <ResultsList 
                  results={results[0]}
                  selectResult={selectResult}
                />
              }
            </>
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
          <SelectedResult result={selectedResult}/>
        </div>
      </div>
    </>
  )
}

export default App
