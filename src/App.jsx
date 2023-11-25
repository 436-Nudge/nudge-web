import { useState } from 'react'
import './styles/App.css'
import { SearchBar } from './components/SearchBar'
import ResultsList from './components/ResultsList'
import SelectedResult from './components/SelectedResult'

const App = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState(null);
  const [isResultSelected, setResultSelected] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const submitSearch = (search) => {
    setSearch(search);
    var httpGet = new XMLHttpRequest();
    var key = "1DDfqiBG47iHDqDcWjJn26LV5uB4ztETWH2Lj5eR";
    var status = search.status ? search.status : "enacted";
    var url = "https://api.propublica.org/congress/v1/116/both/bills/" + status + ".json";
    httpGet.open("GET", url, false);
    httpGet.setRequestHeader("X-API-Key",key);
    httpGet.send( null );
    var newResults = JSON.parse(httpGet.responseText);
    console.log(newResults);
    setResults(newResults.results);
  }

  const selectResult = (result) => {
    setSelectedResult(result);
  }

  return (
    <>
      <div className="header">
        <h1>Nudge</h1>
      </div>
      <div className="main">
        <div className="search">
          <SearchBar submitSearch={submitSearch}/>
          {results &&
            <ResultsList results={results[0]}/>
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
