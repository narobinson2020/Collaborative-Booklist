import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <Fragment>
      <div className='title-in'>
        <h1>Sign In</h1>
      </div>
      <form className='form-in'>
        <div className='form-group-in'>
          <label for='email'>Email</label>
          <input
            className='one'
            type='email'
            name='Email'
            placeholder='Email'
          />
        </div>
        <div className='form-group-in'>
          <label for='password'>Password</label>
          <input
            className='one'
            type='password'
            name='Password'
            minLength='6'
            placeholder='Password'
          />
        </div>
        <div className='form-group-in'>
          <input id='submit' type='submit' value='Confirm' />
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

export default Signin;
