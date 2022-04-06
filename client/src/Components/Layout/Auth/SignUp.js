import React from 'react';

const SignUp = () => {
  return (
    <div>
      <div className='title-up'>
        <h1>Sign Up</h1>
      </div>
      <form className='form-up'>
        <div className='form-group-up'>
          <label for='name'>Name</label>
          <input className='one' type='text' name='name' placeholder='Name' />
        </div>
        <div className='form-group-up'>
          <label for='email'>Email</label>
          <input
            className='one'
            type='email'
            name='email'
            placeholder='Email'
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
          />
        </div>
        <div className='form-group-up'>
          <input id='submit' type='submit' value='Confirm' />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
