import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.css'
import './Navbar.css';


import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({forceRefresh:true});


const NavbarSearch = () => {

  const [searchText, setSearchText] = useState("");

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand"></a>
        <form class="d-flex" action="http://localhost:3000/search/" method="GET">
          <input type="hidden" name="query" value={searchText} /> 
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} 
            onChange={handleSearch}
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default NavbarSearch;