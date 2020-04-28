import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

/** Renders the navbar at the top of each page.
 */

function NavBar() {

  return (
    <div className="NavBar">
      <h4>Jobly</h4>
      <p><NavLink to="/jobs">Jobs</NavLink></p>
      <p><NavLink to="/companies">Companies</NavLink></p>
    </div>
  )
}

export default NavBar;