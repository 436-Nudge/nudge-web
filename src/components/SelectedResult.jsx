import React from 'react'

const SelectedResult = ({result}) => {
  return (
    <>
        <h2>Legislation Summary</h2>
        {result 
            ? <>
                <p>Result Goes Here</p>
            </>
            : <>
                <p>Looks like you haven't selected lesgislation.</p>
                <p><em>Click "Show Summary" on legislation to learn more.</em></p>
            </>
        }
    </>
  )
}

export default SelectedResult