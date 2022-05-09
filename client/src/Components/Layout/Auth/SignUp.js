import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../Actions/alert';
import PropTypes from 'prop-types';

// I get a "hydrate(pin): undefined error when returning the initial state in redux"
// may have something to do with combineReducers in store.js or index.js 
const SignUp = ({setAlert}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log('Success!');
    }
  };

  return (
    <Fragment>
      <div className='title-up'>
        <h1>Sign Up</h1>
      </div>
      <form className='form-up' onSubmit={handleSubmit}>
        <div className='form-group-up'>
          <label htmlFor='name'>Name</label>
          <input
            className='one'
            type='text'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            placeholder='Name'
            required
          />
        </div>
        <div className='form-group-up'>
          <label htmlFor='email'>Email</label>
          <input
            className='one'
            type='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group-up'>
          <label htmlFor='password'>Password</label>
          <input
            className='two'
            type='password'
            name='password'
            minLength='6'
            placeholder='Password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group-up'>
          <label htmlFor='password'> Confirm Password</label>
          <input
            className='two'
            type='password'
            name='password2'
            minLength='6'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group-up'>
          <input id='submit' type='submit' value='Confirm' />
        </div>
        <div>
          <p>
            Already have an acccount? <Link to='/signin'>Sign In</Link>
          </p>
        </div>
        <div>
          <button>
            <Link to='/'>Cancel</Link>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, {setAlert})(SignUp); 
