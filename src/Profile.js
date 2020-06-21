import React, { useState, useContext, useEffect } from "react"
import LoginContext from "./LoginContext";
import JoblyApi from "./JoblyApi";
import "./Profile.css"

/**
 * User profile.
 * default user data for dummy purposes.
 */

function Profile(){
  const { user } = useContext(LoginContext);
  const [formData, setFormData] = useState(null);
  const [ error, setError ] = useState({status: false, message: "There has been an error."})

  useEffect(function() {
    setFormData(oldData => ({...user, password:""}));
    }, [user])


  const handleChange = evt => {
    const {name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name] : value
    
    }));
  };

  async function  handleSubmit(evt) {
    evt.preventDefault();
    //Could have a validateform function
    
    try {
      await JoblyApi.updateUser(formData);
    } catch(err) {
        setError({status: true, message:err.message});
    }
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      {formData 
      ? <div>
        <p> Username: {formData.username} </p>
        <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" value={formData.first_name} id="first_name" onChange={handleChange}/>
        <br/>
        <label htmlFor="last_name">Last name</label>
        <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange}/>
        
        <br/>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={formData.email} onChange={handleChange}/>
        
        <br/>
        <label htmlFor="photo_url">Photo URL</label>
        <input type="text" name="photo_url" id="photo_url" value={formData.photo_url || ""} onChange={handleChange}/>
        
        <br/>
        <label htmlFor="password">Re-enter your password</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required/>
        
        <br/>
        <button className="button">Save changes</button>
        </form> 
      </div>
      : <h2>Loading user data...</h2>
      }
      {error.status 
        ? <h3>{error.message}</h3>
        : ""
      }
    </div>
  )
 }

 export default Profile;

 