import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import axios from 'axios';
import { Data } from './Data';
import { Col, Container, Card, Dropdown } from 'react-bootstrap';
import BackendAPI from "../api/BackendAPI"
import BetsApi from '../api/BetsApi.js';

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
    //STATES

  const [bets, setBets] = useState(Data)
  const [amount, setAmount] = useState()
  const [bookMaker, setBookMaker] = useState(null)
  const [typeBet, setTypeBet] = useState(null)
  const [game, setGame] = useState(null) //going to replace 'bets' with 'game' for actual api call
  const [choice, setChoice] = useState(null)
  const [type, setType] = useState(null)

  //HANDLERS
  const handleAddBetSubmit = async (event) => {
    event.preventDefault()
    const betData = {
      home_team: bets[0].home_team,
      away_team: bets[0].away_team,
      type: type.key,
      bet_choice: choice.name,
      odds: choice.price,
      sports_book: bookMaker,
      amount_bet: amount,
      user: user.id
    }
    console.log(betData)
    await BackendAPI.addNewBet(localStorage.getItem("auth-user"), betData)

  }
  

  //CONST API URL

  // const theOddsUrl = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=757c85032fccd027cb5575eecbdd57fe&regions=us&markets=h2h,spreads,totals&oddsFormat=american';


  //USEFFECT

  // useEffect(() => {
  //   axios.get(theOddsUrl).then(response => {
  //     setBets(response.data);

  //   })
  // }, []);

 useEffect(() => {
  let filteredMarkets = bets[0].bookmakers.filter(elem => elem.title === bookMaker)
  setTypeBet(filteredMarkets[0])
 }, [bookMaker])
 

//FUNCTIONS

  let handleBookmakerSelect = (evt) => {
    setBookMaker(evt.target.id)
    console.log(evt.target.id)
}

  function changeHandler(evt) {
    let tempAmount = evt.target.value
    setAmount(tempAmount)
  } 

  let renderSportsBooks = () => {
    return(
      <Dropdown><Dropdown.Toggle>Select SportsBook</Dropdown.Toggle><Dropdown.Menu>
        {bets[0].bookmakers.filter(elem => elem.title === "William Hill (US)"||elem.title === "FOX Bet"||elem.title==="FanDuel").map(bookmaker => {

          return <Dropdown.Item id={bookmaker.title} onClick={handleBookmakerSelect}>{bookmaker.title}</Dropdown.Item>
          })}</Dropdown.Menu></Dropdown>
          )}




  let renderOdds = () => {
    if(bookMaker && typeBet){
    return (                   
        <Col><Card><Card.Body>
        <label><h3>{bookMaker}</h3></label>
        {typeBet.markets.map((el) => {
          return(
           <span>
            <h4>{el.key}</h4>
            {el.outcomes.map((e) => {
              return(
                <span>
                  <input type="radio" name="bet" value="type" onChange={() => setType(el)} onClick={() => setChoice(e)}/>
                  <p>Team: {e.name} | Price: {e.price} | Point: {e.point}</p>
                </span>
              )})}
           </span>
          )})}
        </Card.Body></Card></Col>
      )}}
//MAIN RETURN

  return (
    <Container className="HomeContainer">
      <h1>Home Page</h1>
      {
        user &&
        <Container>
        <div>
          Welcome Back {user.username}
          <p style={{ color:'green' }}>{ bets[0].home_team }</p>
          <p style={{ color:'red' }}>{ bets[0].away_team }</p>
        </div>
          <Container className="BetsContainer">
            {renderSportsBooks()}
                  </Container>
                  {(bookMaker) && renderOdds()}
                    <label>
                      Amount $ 
                      <input onChange={changeHandler}type="number" name="amount"/>
                    </label>
                    <button onClick={handleAddBetSubmit} type="submit">Submit</button>   
        </Container>
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
    </Container>
  );
};

export default HomePage;

{/*                   
                    return(
                      <Col>
                      <Card><Card.Body>
                      <input type="radio" name="bookmaker" value={bookmaker.title}/>
                      <label><h3>{bookmaker.title}</h3></label>
                      {bookmaker.markets.map((el) => {
                        return(
                         <span>
                          <h4>{el.key}</h4>
                          {el.outcomes.map((e) => {
                            return(
                              <span>
                                <input type="radio" name="bet" value="type"/>
                                <p>Team: {e.name} | Price: {e.price} | Point: {e.point}</p>
                              </span>
                            )
                          })}
                         </span>
                        )
                        }
                      )}
                      </Card.Body></Card>
                      </Col>
            
                    )
            
                  })} */}

                        {/* <ul style={{ listStyle: 'none' }}>
        {bets.map(bet => {
          return( 
          <li>
            <p style={{ color:'green' }}>{ bet.home_team }</p>
            <p style={{ color:'red' }}>{ bet.away_team }</p>
            <span>
            { bet.bookmakers.filter(elem => elem.title === "William Hill (US)"
            ||elem.title === "FOX Bet"
            ||elem.title==="FanDuel").map(bookmaker => {
              return<p>{bookmaker.title}</p>
            })}
            </span>
            <form>
              <label>
                Amount $ 
                <input type="number" name="amount"/>
              </label>
              <input type="submit" value="Submit"/>
            </form>
          </li>
          
          )


        })}
      </ul> */}