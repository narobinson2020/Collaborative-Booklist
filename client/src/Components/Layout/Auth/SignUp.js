import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      console.log('Success!');
    }
  };

  return (
    <Fragment>
      <div className='title-up'>
        <h1>Sign Up</h1>
      </div>
      <form className='form-up' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group-up'>
          <label for='name'>Name</label>
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
          <label for='email'>Email</label>
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
          <label for='password'>Password</label>
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
          <label for='password'> Confirm Password</label>
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

export default SignUp;
