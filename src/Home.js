import React, { useContext } from "react";
import {Link} from "react-router-dom";
import LoginContext from "./LoginContext";
import "./Home.css"

/** Home page, welcomes everyone! 
*    context:
*     LoginContext used to determine what to show to the user
*/
function Home() {
  
  const { isLoggedIn } = useContext(LoginContext)

  return (
    <div className="home">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      { isLoggedIn 
      ? <div><h2>Welcome back.</h2><p><Link to="/jobs" className="button">See the jobs</Link></p></div>
      : <p><Link to="/login" className="button">Log In</Link></p>
      }
    </div>
  )

}

export default Home;