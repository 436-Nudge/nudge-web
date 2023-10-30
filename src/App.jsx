import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

var App = () => {
  const [filtersToggled, toggleFilters] = useState(false); 
  const [stateSelectToggled, toggleStateSelect] = useState(false);

  const toggleSearchFilters = () => {
    if(filtersToggled) toggleStateSelect(false);
    toggleFilters(!filtersToggled)
  }

  const toggleScopeStateSelected = (event) => {
    console.log(event.target.value)
    toggleStateSelect(event.target.value === "state"
      ? true : false);
  }

  return (
    <>
      <div>
        <h1>Nudge</h1>
        <p>Make the System Work for You</p>
      </div>
      <div className='searchBar'>
        <form id = "searchBarForm" onSubmit={() => {console.log("Search!")}}>
          <input id="searchBarInput" placeholder="Search for Legislation"></input>
          <input type = "submit" id="searchBarSubmit" value="Search"></input>
          <input type = "button" id="searchBarFilterToggle" onClick={()=>{toggleSearchFilters()}} value="Filters"></input>
          {filtersToggled && <div id = "searchBarFilters">
              <select id="legislationScope" placeholder="Scope" onChange={(e) => {toggleScopeStateSelected(e)}}>
                <option id="scopeNational" value="national">National</option>
                <option id="scopeState" value="state">State</option>
              </select>
              {stateSelectToggled && <select id="stateSelect" defaultValue="AZ">
                  <option id = "stateArizona" value="AZ">AZ</option>
                  <option id = "stateColorado" value="CO">CO</option>
                </select>
              }
              <input type="number" id="legislation year" placeholder="Year" min="1776" max="2024"></input>
              <select id="legislationStatus" placeholder="Status">
                <option id="statusPassed" value="passed">Passed</option>
                <option id="statusActive" value="active">Active</option>
              </select>
            </div>
          }
        </form>
      </div>
    </>
  );
}

export default App
