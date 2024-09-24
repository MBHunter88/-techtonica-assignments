import React, {useEffect, useState} from "react";

const SearchForm = () => {
    const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  const searchContacts = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/search?input=${searchInput}`);
      const data = await response.json();
      setSearchResults(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };
    
    
    
    
    
    
    return (
        <div>
<form className="search-form" onSubmit={searchContacts}>
    <input name="query"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
    />
    <button type="submit">Search</button>
</form>

{searchResults.length > 0 ? (
        <ul>
          {searchResults.map((contact) => (
            <li key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
</div>
    )
}

export default SearchForm