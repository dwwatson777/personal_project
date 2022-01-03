import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UserContext from '../contexts/UserContext.js';
import { Button, Form } from 'react-bootstrap';
import BackendAPI from '../api/BackendAPI';


function BetReviewPage(props) {
  //USERCONTEXT FOR AUTHENTICATION
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //STATES
  const [userBets, setUserBets] = useState(null)

  //ROUTER PROPS
  const params = useParams()

  useEffect(() => {
    const getBets = async () => {
      let data = await BackendAPI.fetchBetsByID(localStorage.getItem("auth-user"), params.betsID)
      setUserBets(data)
    }
    getBets()
  }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const betsData = {
      home_team: props.bets[0].home_team,
      away_team: props.bets[0].away_team,
      type: props.type.key,
      bet_choice: props.choice.name,
      odds: props.choice.price,
      sports_book: props.bookMaker,
      amount_bet: props.amount,
      user: user.id
    }
    const data = await BackendAPI.editBet(localStorage.getItem("auth-user"), props.bet.id, betsData)
    if (data) {
      Navigate(`/bets/${props.bet.id}`)
    }
  }
  


  return (
    <div>
      <h1>Edit Page</h1>
    </div>
  )
}

export default BetReviewPage
