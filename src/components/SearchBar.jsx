import React, {useState} from 'react'

/**
 * SEARCH CLASS
 * This class represents a single search input by the user, including any filters
 * the user might have selected.
 */
class LegislationSearch {
    constructor(input, status = null, year = 2023, scope = null, state = null) {
        this.input = input;
        this.status = status;
        this.scope = scope;
        this.state = state;
        this.year = year;
    }
}

const SearchBar = ({submitSearch}) => {
    const [filtersToggled, toggleFilters] = useState(false); 
    const [stateSelectToggled, toggleStateSelect] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchStatus, setSearchStatus] = useState(undefined);
    const [searchScope, setSearchScope] = useState(undefined);
    const [searchUSAState, setSearchUSAState] = useState(undefined);
    const [searchYear, setSearchYear] = useState(2023);

    const toggleSearchFilters = () => {
        if(filtersToggled) toggleStateSelect(false);
        toggleFilters(!filtersToggled)
    }

    const setScope = (event) => {
        toggleStateSelect(event.target.value === "state" ? true : false);
        setSearchUSAState(event.target.value === "state" ? searchUSAState : "");
        setSearchScope(event.target.value);
    }

    const submitSearchParameters = (e) => {
        e.preventDefault();
        var newSearch = new LegislationSearch(searchInput, searchStatus, searchYear, searchScope, searchUSAState);
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
                    {/* LEGISLATION SCOPE (National, State, etc.) */}
                    <select id="legislationScope" placeholder="Scope" value={searchScope} onChange={(e) => {setScope(e)}}>
                        <option id="scopeAll" value="all">All</option>
                        <option id="scopeNational" value="national">National</option>
                        <option id="scopeState" value="state">State</option>
                    </select>

                    {/* LEGISLATION STATE (If "state" is selected for scope) */}
                    {stateSelectToggled && <select 
                        id="stateSelect" 
                        placeholder="US State" 
                        value={searchUSAState}
                        onChange={(e) => {setSearchUSAState(e.target.value)}}
                    >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    }

                    {/* LEGISLATION YEAR (Year introduced or Passed) */}
                    <input 
                        type="number" 
                        id="legislation year" 
                        placeholder="Year" 
                        value={searchYear} 
                        onChange={(e)=>{setSearchYear(e.target.value)}}
                        min="1776" max="2024"
                    ></input>
                    
                    {/* LEGISLATION STATUS (Introduced, Active, Passed, Failed, etc.) */}
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
            }
        </form>
    </div>
    )
}

export {SearchBar, LegislationSearch};