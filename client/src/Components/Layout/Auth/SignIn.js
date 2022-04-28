import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Success!');
  };

  return (
    <Fragment>
      <div className='title-in'>
        <h1>Sign In</h1>
      </div>
      <form className='form-in' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group-in'>
          <label for='email'>Email</label>
          <input
            className='one'
            type='email'
            name='Email'
            placeholder='Email'
            value={email}
            onChange={(e) => onChange(e)}
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
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group-in'>
          <input id='submit' type='submit' value='Sign In'/>
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
      </form>
    </Fragment>
  );
};

export default SignIn;
