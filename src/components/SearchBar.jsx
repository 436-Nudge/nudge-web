import React, {useState} from 'react'

/**
 * # SEARCH CLASS
 * 
 * This class represents a single search input by the user, including any filters
 * the user might have selected. 
 * 
 * If the user did not filter the search, the default values for each filter are
 * used.
 */
class LegislationSearch {
    constructor(input, status = null, year = 2023, chamber = "both") {
        this.input = input;
        this.status = status;
        this.chamber = chamber;
        this.year = year;
    }
}

/**
 * Legislation search bar containing filters for general search, year, chamber, and status.
 * 
 * @param {*} submitSearch reference to function that submits the search in the app
 * and calls the api. 
 */
const SearchBar = ({submitSearch}) => {
    const [filtersToggled, toggleFilters] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchStatus, setSearchStatus] = useState(undefined);
    const [searchChamber, setSearchChamber] = useState("both");
    const [searchYear, setSearchYear] = useState(2023);

    const toggleSearchFilters = () => {
        toggleFilters(!filtersToggled)
    }

    const setChamber = (event) => {
        setSearchChamber(event.target.value);
    }

    const submitSearchParameters = (e) => {
        e.preventDefault();
        var newSearch = new LegislationSearch(searchInput, searchStatus, searchYear, searchChamber);
        console.log(newSearch);
        submitSearch(newSearch)
    }

    return (
        <div className='searchBar'>
            <form id = "searchBarForm" onSubmit={(e) => {submitSearchParameters(e)}}>
                <input 
                    id="searchBarInput" 
                    placeholder="Search for Legislation" 
                    value={searchInput} 
                    onChange={(e)=>{setSearchInput(e.target.value)}}
                ></input>
                <input type = "submit" id="searchBarSubmit" value="Search"></input>
                {/* Advanced Filters for Legislation */}
                <input type = "button" id="searchBarFilterToggle" onClick={()=>{toggleSearchFilters()}} value="Filters"></input>
                {filtersToggled && <div id = "searchBarFilters">
                    <div>
                        {/* LEGISLATION CHAMBER (Senate, House, or Both) */}
                        <label htmlFor="legislationChamber">Chamber:</label>
                        <select id="legislationChamber" placeholder="Scope" value={searchChamber} onChange={(e) => {setChamber(e)}}>
                            <option id="chamberBoth" value="both">Both</option>
                            <option id="chamberSenate" value="senate">Senate</option>
                            <option id="chamberHouse" value="house">House</option>
                        </select>
                    </div>

                    <div>
                        {/* LEGISLATION YEAR (Year introduced or Passed) */}
                        <label htmlFor="legislationYear">Year:</label>
                        <input 
                            type="number" 
                            id="legislationYear" 
                            placeholder="Year" 
                            value={searchYear} 
                            onChange={(e)=>{setSearchYear(e.target.value)}}
                            min="1776" max="2024"
                        ></input>
                    </div>
                    <div>
                        {/* LEGISLATION STATUS (Introduced, Active, Passed, Failed, etc.) */}
                        <label htmlFor="legislationStatus">Status:</label>
                        <select 
                            id="legislationStatus" 
                            placeholder="Status" 
                            value={searchStatus} 
                            onChange={(e) => {setSearchStatus(e.target.value)}}
                        >
                            <option id="statusIntroduced" value="introduced">Introduced</option>
                            <option id="statusPassed" value="passed">Passed</option>
                            <option id="statusActive" value="active">Active</option>
                            <option id="statusEnacted" value="enacted">Enacted</option>
                        </select>
                    </div>
                </div>
            }
        </form>
    </div>
    )
}

export {SearchBar, LegislationSearch};