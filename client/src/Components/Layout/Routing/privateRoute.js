import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
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
