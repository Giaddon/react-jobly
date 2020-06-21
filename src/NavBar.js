import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import LoginContext from "./LoginContext"

/** Renders the navbar at the top of each page.
 *  Context:
 *    LoginContext: used to control what users see. Updated if users 
 *                  logout from the nav bar
 */
// Move logout up to App. 
function NavBar() {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
  const history = useHistory();

  // Should NavBar "know how" to log out? Could be in app or a new auth parent.

  function logOut() {
    localStorage.removeItem("_token");
    setIsLoggedIn(false);
    history.push("/");
  }

  return (
    <div className="NavBar">
      <h1 className="nav-title"><NavLink to ="/">Jobly</NavLink></h1>
      { isLoggedIn 
      ?<span className="nav-links">
        <p><NavLink to="/jobs">Jobs</NavLink></p>
        <p><NavLink to="/companies">Companies</NavLink></p>
        <p><NavLink to="/profile">Profile</NavLink></p>
        <button onClick={logOut}>Log out</button>
      </span>
      :""}
    </div>
  )
}

export default NavBar;