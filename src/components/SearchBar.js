import { useState } from 'react'

function SearchBar(props){
    // let [searchTerm, setSearchTerm] = useState('')

    return (
        <form className = 'App'>
            <input required type ="text" placeholder = "Search Here"
                onChange = {
                    (e) => props.handleSearch(e, e.target.value)
                } />
                <p> &nbsp;</p>
        </form>
    )
}

export default SearchBar;
    