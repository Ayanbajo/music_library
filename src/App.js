import './App.css';
import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import {createResource as fetchData} from './helper'


const App = () => {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
      if(searchTerm) {
            setData(fetchData(searchTerm))
        //   const fetchData = async () => {
        //       document.title = `Search results for ${search} music`
        //       setMessage(`Search results for: ${search}`)
        //       const response = await fetch(API_URL + search)
        //       const resData = await response.json()
        //       // console.log(resData)
        //       if (resData.results.length > 0) {
        //           return setData(resData.results)
        //       } else {
        //           return setMessage('No Music Found.')
        //       }
        //   }
        //   fetchData()
      }
  }, [searchTerm])

  const handleSearch = (e, term) => {
      e.preventDefault()
      setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}

  return (
      <div>
        <h1 className='App'>{message}</h1>
          <SearchBar handleSearch={handleSearch} />
          {renderGallery()}
      </div>
  )
}

export default App;

