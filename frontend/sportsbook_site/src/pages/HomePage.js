import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  //states
  const [bets, setBets] = useState([])
  //useEffect
  useEffect(() => {
    const getBets = async () => {




    }
    getBets()
  }, [])


  //render helpers
  const renderBets = () => {
    let elems = bets.map((taskList) => {
      return (
        <li>
          <Link to={`/bets/${bets.id}`}/>
        </li>
      )
    })
  }
  return (
    <div>
      <h1>Home Page</h1>
      {
        user &&
        <div>
          Welcome Back {user.username}
        </div>
      }
      {
        !isLoggedIn
        ?
        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
        :
        <button onClick={handleLogout}>Logout</button>
      }
    </div>
  );
};

export default HomePage;