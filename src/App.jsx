import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import SearchBar from './components/SearchBar'

var App = () => {
  

  return (
    <>
      <div>
        <h1>Nudge</h1>
        <p>Make the System Work for You</p>
      </div>
      <SearchBar/>
    </>
  );
}

export default App
