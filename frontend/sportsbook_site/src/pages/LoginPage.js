import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';


const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  if (isLoggedIn) {
    return <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Navigate to='/'>Home</Navigate>
      </div>
    </div>
  }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>UserName:</label>
        <input type='text' placeholder='Customer' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Submit</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;


