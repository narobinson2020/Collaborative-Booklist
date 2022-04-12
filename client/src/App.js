import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/Layout/Auth/SignIn';
import SignUp from './Components/Layout/Auth/SignUp';
import Landing from './Components/Layout/Auth/Landing';

const App = () => (
  <Router>
    <Fragment>
        {/* Components that you want to render regardless of the page (ex: nav bar) should be put outside the routes component but inside the router component */}
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
        </Routes>
        
    </Fragment>
  </Router>
);

export default App;
