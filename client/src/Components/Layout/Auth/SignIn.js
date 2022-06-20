import React, { Fragment, useState } from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../Actions/auth';
import PropTypes from 'prop-types';

const SignIn = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  // figure out where you want to validate isAuthentiated on this page (onSubmite or onChange)
  // delete form, make sure everything renders and consider making simpler signin form
  // hard code email and passwords via variables for now to make sure validation works 
  if (isAuthenticated) {
    navigate('/profile');
    return <Navigate to='/profile' />;
  }

  return (
    <Fragment>
      <div className='title-in'>
        <h1>Sign In</h1>
      </div>
      {/* <form className='form-in' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group-in'>
          <label htmlFor='email'>Email</label>
          <input
            className='one'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group-in'>
          <label htmlFor='password'>Password</label>
          <input
            className='one'
            type='password'
            name='password'
            minLength='6'
            placeholder='Password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group-in'>
          <input id='submit' type='submit' value='Sign In' />
        </div>
        <div>
          <p>
            Don't have an acccount? <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
        <div>
          <button>
            <Link to='/'>Cancel</Link>
          </button>
        </div>
      </form> */}
    </Fragment>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
