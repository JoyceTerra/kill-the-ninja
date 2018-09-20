import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, updatePlayerPosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  moveOnBoard = (event) => {
    const {game, userId, updatePlayerPosition} = this.props
    let nextPosX
    let nextPosY
    let curPosX = 0
    let curPosY = 0

    const curPlayer = game.players.find(p => p.userId === userId)
    console.log(curPlayer)
    
    //if(curPlayer === "nA"){
    //  console.log(game.nA)
    //  curPosX = game.nA.x
    //  curPosY = game.nA.y
    //}
    //else if(curPlayer === "nB"){
    //  console.log(game.nB)
    //  curPosX = game.nB.x
    //  curPosY = game.nB.y
    //}
    switch(event.target.name){
        case 'ArrowLeft':
          if(curPlayer.symbol === "nA"){
            console.log(game.nA)
            curPosX = game.nA.x
            curPosY = game.nA.y
            if(curPosY > 0){
              nextPosX = curPosX
              nextPosY = curPosY - 1
              console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
              const position = {type: 'nA', nA:{x: nextPosX , y: nextPosY}} 
              console.log(position)
              updatePlayerPosition(game.id, position)
            }
          }
          else if(curPlayer.symbol === "nB"){
            console.log(game.nB)
            curPosX = game.nB.x
            curPosY = game.nB.y
            if(curPosY > 0){
              nextPosX = curPosX
              nextPosY = curPosY - 1
              console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
              const position = {type: 'nB', nB: {x: nextPosX , y: nextPosY}} 
              console.log(position)
              updatePlayerPosition(game.id, position)
            }
          }
          break

        case 'ArrowUp':
          if(curPlayer.symbol === "nA"){
            console.log(game.nA)
            curPosX = game.nA.x
            curPosY = game.nA.y
            if(curPosX > 0){
              nextPosX = curPosX -1
              nextPosY = curPosY
              console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
              const position = {type: 'nA', nA:{x: nextPosX , y: nextPosY}} 
              console.log(position)
              updatePlayerPosition(game.id, position)
            }
          }
          else if(curPlayer.symbol === "nB"){
            console.log(game.nB)
            curPosX = game.nB.x
            curPosY = game.nB.y
            if(curPosX > 0){
              nextPosX = curPosX - 1
              nextPosY = curPosY
              console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
              const position = {type: 'nB', nB:{x: nextPosX , y: nextPosY}} 
              console.log(position)
              updatePlayerPosition(game.id, position)
            }
          }
          break

        /*case 'ArrowRight':
            if(curPosY < 39){
                nextPosX = curPosX
                nextPosY = curPosY + 1
                console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
                this.makeMove(nextPosX, nextPosY, curPosX, curPosY)
            }
            break

        case 'ArrowDown':
          if(curPosX < 9){
            nextPosY = curPosY
            nextPosX = curPosX + 1
            console.log(`${curPosX}-${curPosY}|${nextPosX}-${nextPosY}`)
            this.makeMove(nextPosX, nextPosY, curPosX, curPosY)
          }
          break*/

            default:
        
    }
}

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell, fromRow, fromCell) => {
    const {game, updateGame} = this.props
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    console.log(game.turn)
    updateGame(game.id, board)
  }

  render() {
    const {game, users, authenticated, userId} = this.props
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<div onKeyUp={this.moveOnBoard}><Paper className="outer-paper">
      <h4>
        Game #{game.id} - Status: {game.status}
        {
          game.status === 'started' &&
          player && player.symbol === game.turn &&
          <p>It's your turn!</p>
        }      
      </h4>


      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        
        game.status !== 'pending' &&
          <Board board={game.board} makeMove={this.makeMove} />
      }
      <button name="ArrowRight" onClick={this.moveOnBoard}>right</button>
      <button name="ArrowLeft" onClick={this.moveOnBoard}>left</button>
      <button name="ArrowUp" onClick={this.moveOnBoard}>up</button>
      <button name="ArrowDown" onClick={this.moveOnBoard}>down</button>
    </Paper></div>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, updatePlayerPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
