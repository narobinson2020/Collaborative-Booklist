import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <div className='title-auth'>
        <h1>Welcome to Your Booklist!</h1>
      </div>
      <div className='container-auth'>
        <div className='register-auth'>
          <button>
            <Link to='/signup'>Sign Up</Link>
          </button>
        </div>
        <div className='login-auth'>
          <button>
            <Link to='/signin'>Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
