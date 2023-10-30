import { useState } from 'react'
import './styles/App.css'
import { SearchBar } from './components/SearchBar'

const App = () => {
  const [search, setSearch] = useState(null)

  const submitSearch = (search) => {
    setSearch(search);
  }

  return (
    <>
      <div className="header">
        <h1>Nudge</h1>
      </div>
      <SearchBar submitSearch={submitSearch}/>
      {search && <p>
        {search.input}
      </p>}
    </>
  )
}

export default App
