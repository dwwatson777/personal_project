
const BETS_URL = 'http://localhost:8000/sportsbook/bets/'

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

const addNewBet = async (token, betObject) => {
  const url = BETS_URL
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify(betObject)
  }
    let response = await fetch (url, init)
    let data = await response.json()
    return data
  }

const editBet = async (token, betsID, betsObj) => {
  const url = BETS_URL + `${betsID}/`
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify(betsObj)
  }
  let response = await fetch (url, init)
  let data = await response.json()
  return data
}

const deleteBet = async (token, taskID) => {
  let url = BETS_URL + `${taskID}`
  await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}`}})
}

const exportItems = {
  fetchBets,
  fetchBetsByID,
  addNewBet,
  editBet,
  deleteBet
}

export default exportItems