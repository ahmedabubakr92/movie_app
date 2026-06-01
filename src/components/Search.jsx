import SearchIcon from "../assets/search.svg"

function Search({searchTerm, setSearchTerm}) {
  return (
    <div className='search'>
        <div>
            <img src={SearchIcon} alt="Search Icon" />

            <input 
              type="text"
              placeholder="Search through thousands of movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search