import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import axios from 'axios';
import { Data } from '../contexts/Data';
import { Col, Container, Card, CardGroup, Dropdown } from 'react-bootstrap';
import BetReviewPage from './BetReviewPage.js';
import BackendAPI from "../api/BackendAPI";
import BetsApi from '../api/BetsApi.js';
import OtherBasketball from '../Images/OtherBasketball.png'
import SlamDunk from '../Images/SlamDunk.png'

const HomePage = ({ isLoggedIn, handleLogout }) => {
    //CONST API URL
  // const theOddsUrl = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=757c85032fccd027cb5575eecbdd57fe&regions=us&markets=h2h,spreads,totals&oddsFormat=american';

  //USERCONTEXT FOR AUTHENTICATION
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const navigate = useNavigate()

    //STATES
  const [bets, setBets] = useState([])
  const [amount, setAmount] = useState()
  const [bookMaker, setBookMaker] = useState("FanDuel")
  const [typeBet, setTypeBet] = useState()
  const [game, setGame] = useState(null)
  const [choice, setChoice] = useState(null)
  const [type, setType] = useState(null)

  //HANDLERS
  const handleAddBetSubmit = async (event) => {
    event.preventDefault()
    const betData = {
      home_team: bets.home_team,
      away_team: bets.away_team,
      type: type.key,
      bet_choice: choice.name,
      odds: choice.price,
      sports_book: bookMaker,
      amount_bet: amount,
      user: user.id
    }
    console.log(betData)
    await BackendAPI.addNewBet(localStorage.getItem("auth-user"), betData)
    navigate('/bets/')
  }


  //USEFFECT
  useEffect(() => {
    axios.get(theOddsUrl).then(response => {
      console.log(response.data)
      setBets(response.data)

    })
  }, []);

 
  useEffect(() => {
    console.log(typeBet)
   }, [typeBet])
 

//FUNCTIONS
  let gameSelect = (evt) => {
    setGame(evt.target.id)
    console.log(evt.target.id)
  }

  let handleBookmakerSelect = (evt) => {
    setBookMaker(evt.target.id)
    let filteredMarkets = game.bookmakers.find(elem => elem.title === bookMaker)
    console.log(filteredMarkets)
    setTypeBet(filteredMarkets)
    console.log(evt.target.id)
}

  function changeHandler(evt) {
    let tempAmount = evt.target.value
    setAmount(tempAmount)
  }

  let renderGame = () => {
    return(
      <Dropdown><Dropdown.Toggle>Select game</Dropdown.Toggle><Dropdown.Menu>
        {bets.map(elem => {
          return(
            <Dropdown.Item id={elem} onClick={() => setGame(elem)}>{elem.away_team} VS. {elem.home_team}</Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
      </Dropdown>
    )
  }

  let renderSportsBooks = () => {
    return(
      <Dropdown className="SportsBookDrop"><Dropdown.Toggle>
        Select SportsBook
        </Dropdown.Toggle><Dropdown.Menu>
        {game.bookmakers.filter(elem => elem.title === "William Hill (US)"||elem.title === "FOX Bet"||elem.title==="FanDuel").map(bookmaker => {

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
      <Container className="HeaderContainer">
      <h1>Bet Testers</h1>
      <h3>The Ultimate Site for Testing Your Betting Acumen</h3>
      </Container>
      {
        user &&
        <Container>
        <div>
          <div style={{color: 'white'}}>
          <h3>  
          Welcome Back {user.username}
          </h3>
          </div>
          <Container className="GameContainer">{bets && renderGame()}</Container>
        </div>
          <Container className="BetsContainer">
            {game && <h3 style={{color: 'white'}}>{game.away_team} VS. {game.home_team}</h3>}
            {game && renderSportsBooks()}
                  </Container>
                  {(bookMaker) && renderOdds()}
                    <label style={{color: 'white'}}>
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
          <div className="Accounts">
            <CardGroup className="Images">
            <Card>
              <Card.Header>Existing Users</Card.Header>
              <Card.Body>
                <Card.Text>
                  Already a user? Login and starting placing your bets!
                </Card.Text>
                <Link to='/login'>Login</Link>
                <div className="ExistingImage">
                  <img src={OtherBasketball} alt="basketball"/>
                </div>
              </Card.Body>
            </Card>
            <br/>
            <Card>
              <Card.Header>Create New Account</Card.Header>
                <Card.Body>
                  <Card.Text>Create an account and see if you have what it takes to win!</Card.Text>
                    <Link to='/signup'>Signup</Link>
                    <div className="ExistingImage">
                      <img src={SlamDunk} alt="slamdunk"/>
                    </div>
                </Card.Body>
            </Card>
            </CardGroup>
          </div>
          <hr/>

        </div>
        :
        <button onClick={handleLogout}>Logout</button>
      }
    </Container>
  );
};

export default HomePage;

