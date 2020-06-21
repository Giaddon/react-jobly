import React, { useEffect, useState } from "react";
import JoblyApi from "./JoblyApi"
import CompanyCard from "./CompanyCard"
import Search from "./Search";
import "./Companies.css";

/** List of companies, data comes from API.
 *    States:
 *      companies: Array of company objects, used to provide data for CompanyCards.
 *      searchTerm: User-input string, provided to the API.
 *      Error: Tracks errors and determines what to show users
 *      loading: Determines what to show users while waiting on API call
 */

function Companies() {
  const [ companies , setCompanies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ error, setError] = useState(false);
  const [ loading, setLoading ] = useState(true);

  // Gets the data from the API. Uses the searchTerm state to filter results if one exists.
  useEffect(() => {
      async function fetchCompanies (term) {
        try {
          const companiesResult = await JoblyApi.getCompanies(term);
          setCompanies(companiesResult);
          setLoading(false);
        } catch(err) {
          console.log(err);
        }
      }
        fetchCompanies(searchTerm);
  },[searchTerm])

  // Sets the searchTerm state based on the content of the Search child component.
  function submitSearch(term) {
    setSearchTerm(term);
  }

  return (
    <div className="companies">
      <h1>Partner Companies</h1>
      <Search submitSearch={submitSearch} />
      {error 
        ? <h2>There has been an error loading external data. Please try again later.</h2>
        : ""
      }
      {loading 
        ? <h1>Loading...</h1> 
        : companies.map(c => <CompanyCard key={c.handle} company={ c }/>)  
      }
    </div>
  )
}

export default Companies;