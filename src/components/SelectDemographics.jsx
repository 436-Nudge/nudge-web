import React from 'react'

/**
 * Open ended input for users to add their own identities to analyze with the
 * selected legislation.
 * 
 * @param {*} submitDemographics Reference to function that submits the 
 * demographics as an array of strings to python backend so that ai response
 * can be generated.
 */
const SelectDemographics = ({submitDemographics}) => {
    const [demographics, setDemographics] = useState("");

    const submitDemographicInput = (e) => {
        e.preventDefault();
        let demographicsArray = demographics.split(',');
        for(let demographic in demographicsArray) demographic.trim();
        submitDemographics(demographicsList);
    }
    return (
        <div className="select-demographics">
            <form onSubmit={(e) => {submitDemographicInput(e)}}>
                
            </form>
        </div>
    )
}

export default SelectDemographics