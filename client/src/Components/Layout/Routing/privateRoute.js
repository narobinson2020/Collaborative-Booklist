import React, { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profile from '../Profile/Profile';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Fragment>
          {!isAuthenticated && !loading ? (
            <Navigate to='/signin' replace/>
          ) : (
          //this was originally <Component {...props} /> but changed to profile so that each time a use logs in they are redirected to the profile page.
            <Profile /> 
          )}
  </Fragment>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
