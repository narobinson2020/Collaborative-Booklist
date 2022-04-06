import React from 'react';

const authentication = () => {
  return (
    <div>
      <div className='title-auth'>
        <h1>Welcome to Your Booklist!</h1>
      </div>
      <div className='container-auth'>
        <div className='register-auth'>
          <button>
            <a href='SignUp.html'>Sign Up</a>
          </button>
        </div>
        <div className='login-auth'>
          <button>
            <a href='SignIn.html'>Sign In</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default authentication;
