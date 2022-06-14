import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../Actions/profile';
import Spinner from '../Layout/spinner';

// private route issue might be in profile component. user.name on line 23 might be returning "undefined"
// issue could also be 
const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile]); //adding getCurrentProfile into the array seems to have solved the the useEffect issue

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Welcome!</h1>
      {profile !== null ? (
        <Fragment><h1>This will be the profile component jsx</h1></Fragment>
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
