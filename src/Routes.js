import React, {useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Home from "./Home";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import LoginContext from "./LoginContext"
import NotFound from "./NotFound";


/** Controls which components to load based on url. 
 *  context:
 *    isLoggedIn: determines wheter users has access to certain routes
 */

function Routes({ user }) {
  const { isLoggedIn } = useContext(LoginContext);

  return   (
      <Switch>
        <Route exact path="/login"><LoginForm /></Route>
        <Route exact path="/register"><RegistrationForm /></Route>
        <Route exact path="/"><Home /></Route>
        {isLoggedIn 
          ? <Switch>
            <Route exact path="/jobs"><Jobs /></Route>
            <Route exact path="/companies/:handle"><Company /></Route>
            <Route exact path="/companies"><Companies /></Route>
            <Route exact path="/profile"><Profile /></Route>
            <Route><NotFound /></Route>
          </Switch>
          : null
        }
        <Route><NotFound /></Route>
      </Switch>
  
  )
}

export default Routes;