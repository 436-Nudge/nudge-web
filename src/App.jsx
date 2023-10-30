import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Nudge</h1>
        <p>Make the System Work for You</p>
      </div>
      <div className='searchBar'>
        <input id="searchBarInput" placeholder="Search for Legislation"></input>
      </div>
    </>
  )
}

export default App
