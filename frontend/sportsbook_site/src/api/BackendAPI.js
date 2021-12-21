import axios from 'axios'
const BETS_URL = 'http://localhost:8000/sportsbook/bets/'
const ACCOUNTS_URL = 'http://localhost:8000/sportsbook/useraccount/'

const fetchBets = async(token) => {
  const url = BETS_URL
  const init = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }
  let response = await fetch(url, init)
  let data = await response.json()
  return data
};

const fetchBetsByID = async(token, betsID) => {
  const url = BETS_URL
  const init = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }
    let response = await fetch(`${url}${betsID}`, init)
    let data = await response.json()
    return data
  };

const addNewBet = (token, betObject) => {
  const url = BETS_URL
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify(listObj)
  }
    let response = await fetch (url, init)
    let data = await response.json()
    return data
  }

const editBet = (token, betsID, betsObj) => {
  const url = BETS_URL + `${betsID}/`
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify(listObj)
  }
  
}