import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/FireBaseAuth/Login';
import AdminDashBoard from './Component/Admin/DashBoard';
import Home from './Component/Home/Home';
import NotMatch from './Component/NotMatch/NotMatch';
import RegisterVolunteer from './Component/RegisterVolunteer/Register';
import VolunteerDetails from './Component/RegisterVolunteer/VolunteerDetails';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
export const UserContext = createContext();


function App() {
  const [user, setUser] = useState({});

  return (
    
    <UserContext.Provider value={[user, setUser]}>
      <Router>
      <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute exact path="/register/:EventTitle">
             <RegisterVolunteer></RegisterVolunteer>
            </PrivateRoute>
            <PrivateRoute exact path="/volunteer-details">
              <VolunteerDetails></VolunteerDetails>
            </PrivateRoute>
            <Route exact path="/dashboard">
              <AdminDashBoard/>
            </Route>
            <Route exact path="/login" component={Login} />;
            <Route path="*" component={NotMatch} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
