import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../Actions/profile';
import Spinner from '../Layout/spinner';

// private route issue might be in Profile component. Line 22 might be returning "undefined"
// profile is now set up via postman on the back end. Issue must be something returning undefined

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]); //adding getCurrentProfile into the array seems to have solved the the useEffect issue

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Welcome {user && user.name}!</h1>
      {profile !== null ? (
        <Fragment>
          <h1>This will be the profile component jsx</h1>
        </Fragment>
      ) : (
        <Fragment>
          Begin by creating a list for you and your friends!{' '}
          <Link to='/create-list'>Create List</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
