import React from 'react';
import { Route, Navigate, Routes, Outlet } from 'react-router-dom';
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
            <Profile {...props} />
          )
        }
      />
      <Outlet />
  </Routes>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
