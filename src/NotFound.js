import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

/** 404 Error page */
function NotFound() {
  
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p><Link to="/" className="button">Return home</Link></p>
    </div>
  )

}

export default NotFound;