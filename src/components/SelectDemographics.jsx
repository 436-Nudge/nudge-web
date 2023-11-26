import React, {useState} from 'react'

/**
 * Open ended input for users to add their own identities to analyze with the
 * selected legislation.
 * 
 * @param {*} submit Reference to function that submits the 
 * demographics as an array of strings to python backend so that ai response
 * can be generated.
 */
const SelectDemographics = ({submit}) => {
    const [demographics, setDemographics] = useState("");

    const submitDemographicInput = (e) => {
        e.preventDefault();

        /* 
            Split the demographics into separate strings so that the main app
            can format them however it needs.
        */
        let demographicsArray = demographics.split(',');
        for(let i = 0; i < demographicsArray.length; i++)
            demographicsArray[i] = demographicsArray[i].trim();

        submit(demographicsArray);
    }
    return (
        <div className="select-demographics">
            <form 
                id = "select-demographics--form" 
                onSubmit={(e) => {submitDemographicInput(e)}}
            >
                <label htmlFor='demographic-input' id="demographic-input-label">Input your Demographics</label>
                <input 
                    type="text" 
                    id="demographic-input" 
                    onChange={(e)=>{setDemographics(e.target.value)}}
                    value={demographics}
                />
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}

export default SelectDemographics