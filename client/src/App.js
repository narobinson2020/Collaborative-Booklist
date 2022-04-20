import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/Layout/Auth/SignIn';
import SignUp from './Components/Layout/Auth/SignUp';
import Landing from './Components/Layout/Auth/Landing';

//Redux
import { Provider } from 'react-redux';
import store from './store';


// App doesn't render again. Check what changed after adding useState and hook videos 

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        {/* Components that you want to render regardless of the page (ex: nav bar) should be put outside the routes component but inside the router component */}
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
        </Routes>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
