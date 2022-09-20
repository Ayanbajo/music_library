import './App.css';
import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'


const App = () => {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
      const fetchData = async () => {
        document.title = `Search Results For ${term} Music`
        setMessage(`Search results for: ${search}`)
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        // console.log(resData)
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('No Music Found.')
        }
    }
    fetchData()
  }

  return (
      <div>
        <h1 className='App'>{message}</h1>
            <SearchContext.Provider value ={{
                term: searchInput,
                handleSearch: handleSearch
            }}>
                <SearchBar handleSearch={handleSearch} />
            </SearchContext.Provider>         
            <DataContext.Provider value={data}>
               <Gallery />
            </DataContext.Provider>         
      </div>
  )
}

export default App