import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profile from '../Profile/Profile';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Routes>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Navigate to='/signin' replace/>
          ) : (
          //this was originally <Component {...props} /> but changed to profile so that each time a use logs in they are redirected to the profile page.
            <Profile {...props} /> 
          )
        }
      />
  </Routes>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
