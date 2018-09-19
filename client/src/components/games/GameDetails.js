import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (e, toRow, toCell) => {
    const {game, updateGame} = this.props
    console.log(e)
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    updateGame(game.id, board)
  }


  moveOnBoard = (event) => {
    var curElement
    var nextElement
    curElement = document.getElementById(`${curPosX}-${curPosY}`)
    curElement.classList.replace('div-inactive','div-active')
    switch(event.key){
        case 'ArrowLeft':
            if(curPosY > 0){
                console.log(curPosY)
                //curElement = document.getElementById(`${curPosX}-${curPosY}`)
                //curElement.classList.replace('div-active','div-inactive')
                curPosY -= 1 
                //nextElement = document.getElementById(`${curPosX}-${curPosY}`)
                //nextElement.classList.replace('div-inactive','div-active')
            }
            break

        case 'ArrowUp':
            if(curPosX > 0){
                //curElement = document.getElementById(`${curPosX}-${curPosY}`)
                //curElement.classList.replace('div-active','div-inactive')
                curPosX -= 1 
                //nextElement = document.getElementById(`${curPosX}-${curPosY}`)
                //nextElement.classList.replace('div-inactive','div-active')
            }
            break

        case 'ArrowRight':
            if(curPosY < 39){
                //curElement = document.getElementById(`${curPosX}-${curPosY}`)
                //curElement.classList.replace('div-active','div-inactive')
                curPosY += 1 
                //nextElement = document.getElementById(`${curPosX}-${curPosY}`)
                //nextElement.classList.replace('div-inactive','div-active')
            }
            break
        
        case 'ArrowDown':
            if(curPosX < 9){
                //curElement = document.getElementById(`${curPosX}-${curPosY}`)
                //curElement.classList.replace('div-active','div-inactive')
                curPosX += 1 
                //nextElement = document.getElementById(`${curPosX}-${curPosY}`)
                //nextElement.classList.replace('div-inactive','div-active')
            }
            break
    }
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

    return (<Paper className="outer-paper">
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
        <div name="container-board" onKeyUp={this.moveOnBoard(event)}>
          <Board board={game.board} makeMove={this.makeMove} />
        </div>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
