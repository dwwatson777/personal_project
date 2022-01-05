import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UserContext from '../contexts/UserContext.js';
import { Button, Form, Card } from 'react-bootstrap';
import BackendAPI from '../api/BackendAPI';


function BetReviewPage(props) {
  //USERCONTEXT FOR AUTHENTICATION
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //STATES
  const [userBets, setUserBets] = useState(null)
  const [betForEdit, setBetForEdit] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [triggerUpdate, setTriggerUpdate] = useState(false)
  
  const params = useParams()

  useEffect(() => {
    const getBets = async () => {
      let data = await BackendAPI.fetchBets(localStorage.getItem("auth-user"))
      setUserBets(data)
    }
    getBets()
  }, [triggerUpdate])

const handleEditClick = async (event) => {
  event.preventDefault()
  let bet = await BackendAPI.fetchBetsByID(localStorage.getItem("auth-user"), event.target.id)
  setBetForEdit(bet)
  setShowEditForm(true)
}

const deleteBet = async (event) => {
  event.preventDefault()
  let betID = event.target.id
  await BackendAPI.deleteBet(localStorage.getItem("auth-user"), betID)
  let userBetsCopy = [...userBets]
  let newUserBets = userBetsCopy.filter(elem => elem.id != betID)
  setUserBets(newUserBets)

}



const renderBets = () => {
  if (userBets) {
    return(
    userBets.map((elem) => {
      return <Card className="BetCard">
        <Card.Title>
          {elem.away_team} VS {elem.home_team}
        </Card.Title>
        <Card.Body>
        Bet Details: {elem.type} | {elem.bet_choice} | {elem.sports_book} | {elem.amount_bet}
        </Card.Body>
        <div>
          <Button id={elem.id} onClick={handleEditClick} variant="warning" className="EDButtons">Edit</Button>
          <Button id={elem.id} onClick={deleteBet} variant="danger" className="EDButtons">Delete</Button>
        </div>
      </Card>
    }))
  }
}
  const handleFormSubmit = async (event) => {
    setTriggerUpdate(false)
    event.preventDefault()
    const betsData = {
      amount_bet: event.target.elements[0].value
    }
    await BackendAPI.editBet(localStorage.getItem("auth-user"), betForEdit.id, betsData)
    setTriggerUpdate(true)
    setShowEditForm(false)
  }
  


  return (
    <div>
      <h1>Bet Review and Alter Page</h1>
      {showEditForm &&
      <div>
        <h3>You are editing your {betForEdit.home_team} VS. {betForEdit.away_team} bet</h3>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Amount Bet</Form.Label>
              <Form.Control defaultValue={betForEdit.amount_bet} placeholder="Amount Bet" />
          </Form.Group>
            <br />
            <Button variant="primary" type="submit">
            Save
            </Button>
            <Button variant="warning" onClick={() => setShowEditForm(false)}>Cancel</Button>
        </Form>
        </div>}
      <hr />
      {userBets && renderBets()}
    </div>
  )
}

export default BetReviewPage


