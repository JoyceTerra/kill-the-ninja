import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
})

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
})

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
})


export const getGames = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err))
}

export const joinGame = (gameId) => (dispatch, getState) => {
  const state = getState()
  console.log(state)
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games/${gameId}/players`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err))
}

export const createGame = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err))
}

export const updateGame = (gameId, board) => (dispatch, getState) => {
  console.log('board before save',board)
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ board })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err))
}

export const updatePlayerPosition = (gameId, position, board, player, player2, positionWeapon1, positionWeapon2) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  console.log('oque ta vindo weapon', positionWeapon1)
  console.log('oque ta vindo weapon2', positionWeapon2 )

  if (isExpired(jwt)) return dispatch(logout())


  let nA 
  let nB 
  let weapon1nA
  let weapon1nB

  
  if(player === "nA"){
    nA = position
    nB = player2
    weapon1nA = positionWeapon1
    weapon1nB = positionWeapon2
  console.log('ta entrando?',  weapon1nA)
  }
  else if(player === "nB"){
    
    nB = position
    nA = player2
    weapon1nA = positionWeapon1
    weapon1nB = positionWeapon2
  }
  request
  .patch(`${baseUrl}/games/${gameId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .send({board, nA, nB, weapon1nA, weapon1nB})
  .then(_ => dispatch(updateGameSuccess()))
  .catch(err => console.error(err))

}