import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom"
import JoblyApi from "./JoblyApi";
import LoginContext from "./LoginContext";
import "./RegistrationForm.css";

/**
 * Registration form for usesrs.
 *  State:
 *    formData: Keeps track of user input
 *    error: Tracks errors and used to determine what to show to user
 *  Context: LoginContext, used to determine what to show to user
 *  History: Used to redirect once user loggedin.
 */

const INITIAL_ERROR = {status: false, message:"There has been an error."}

function RegistrationForm(){
  const [formData, setFormData] = useState()
  const [ error, setError ] = useState({...INITIAL_ERROR});
  const { setIsLoggedIn} = useContext(LoginContext);
  const history = useHistory();


  const handleChange = evt => {
    const {name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name] : value
    
    }));
  };

  // Registers user via JoblyApi. When registered store token in local storage
  // sets isLoggedIn State to true and redirects to /jobs
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const token = await JoblyApi.registerUser(formData);
      localStorage.setItem("_token", token);
      setIsLoggedIn(true);
      history.push("/jobs");
    } catch(err) {
      if (err.status === 401) {
        setError({status:true, message:err.message});
      }
    }
  }

  function displayError(){
    if (error.status) return ( <h3>{error.message}</h3> );
  }


  return (
    <div className="registrationform">
       <span className="toggler"><Link to="/login"><h2 className="button">Log In</h2></Link><h2 className="nega-button">Register</h2></span>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={handleChange}/><br />
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange}/><br />
        
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" onChange={handleChange}/><br />
        
        <label htmlFor="last_name">Last name</label>
        <input type="text" name="last_name" id="last_name" onChange={handleChange}/><br />
        
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={handleChange}/><br />
        
        <button className="button">Submit</button>
      </form>
      {displayError()}
    </div>
  )
}

export default RegistrationForm;