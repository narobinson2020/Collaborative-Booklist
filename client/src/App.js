import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/Layout/Auth/SignIn';
import SignUp from './Components/Layout/Auth/SignUp';
import Landing from './Components/Layout/Auth/Landing';
import Alert from './Components/Layout/Layout/alert';
import { loadUser } from './Actions/auth';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
useEffect(() => {
  store.dispatch(loadUser);
}, []);

  return( 
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* Components that you want to render regardless of the page (ex: nav bar) should be put outside the routes component but inside the router component */}
          <Alert />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/signin' element={<SignIn />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
