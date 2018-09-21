import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, updatePlayerPosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  moveOnBoard = (event) => {
    event.preventDefault();
    const {game, userId, updatePlayerPosition} = this.props
    let nextPosX
    let nextPosY
    let curPosX = 0
    let curPosY = 0

    const curPlayer = game.players.find(p => p.userId === userId)
    //switch(event.target.name){
      switch(event.keyCode){
        case 37: //left
          if(curPlayer.symbol === "nA"){
            let positionNA = game.nA.split('-')
            curPosX = parseInt(positionNA[0])
            curPosY =parseInt(positionNA[1])
            if(curPosY > 0){
              nextPosX = curPosX
              nextPosY = curPosY - 1
              const position = `${nextPosX}-${nextPosY}`
              if(position !== game.nB){
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
              }
            }
          }
          else if(curPlayer.symbol === "nB"){
            let positionNB = game.nB.split('-')
            curPosX = parseInt(positionNB[0])
            curPosY = parseInt(positionNB[1])
            if(curPosY > 0){
              nextPosX = curPosX
              nextPosY = curPosY - 1
              const position =  `${nextPosX}-${nextPosY}`
              if(position !== game.nA){
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
              }
            }
          }
          break

        // case 38: //up
        //   if(curPlayer.symbol === "nA"){
        //     let positionNA = game.nA.split('-')
        //     curPosX = parseInt(positionNA[0])
        //     curPosY = parseInt(positionNA[1])
        //     if(curPosX > 6){
        //       nextPosX = curPosX -3
        //       nextPosY = curPosY +3
        //       const position =  `${nextPosX}-${nextPosY}`
        //       if(position !== game.nB){
        //         updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
        //       }
        //     }
        //   }
        //   else if(curPlayer.symbol === "nB"){
        //     let positionNB = game.nB.split('-')
        //     curPosX = parseInt(positionNB[0])
        //     curPosY = parseInt(positionNB[1])
        //     if(curPosX > 6){
        //       nextPosX = curPosX - 3
        //       nextPosY = curPosY - 3
        //       const position = `${nextPosX}-${nextPosY}`
        //       if(position !== game.nA){
        //         updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
        //       }
        //     }
        //   }
        //   break

        case 39: //right
          if(curPlayer.symbol === "nA"){
            let positionNA = game.nA.split('-')
            curPosX = parseInt(positionNA[0])
            curPosY = parseInt(positionNA[1])
            if(curPosY < 14){
              nextPosX = curPosX
              nextPosY = curPosY + 1
              const position = `${nextPosX}-${nextPosY}`
              if(position !== game.nB){
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
              }
            }
          }
          else if(curPlayer.symbol === "nB"){
            let positionNB = game.nB.split('-')
            curPosX = parseInt(positionNB[0])
            curPosY = parseInt(positionNB[1])
            if(curPosY < 14){
              nextPosX = curPosX
              nextPosY = curPosY + 1
              const position =  `${nextPosX}-${nextPosY}`
              if(position !== game.nA){
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
              }
            }
          }
          break
          
        // case 40: //down
        //   if(curPlayer.symbol === "nA"){
        //     console.log(game.nA)
        //     let positionNA = game.nA.split('-')
        //     curPosX = parseInt(positionNA[0])
        //     curPosY = parseInt(positionNA[1])
        //     if(curPosX < 9){
        //       nextPosX = curPosX + 3
        //       nextPosY = curPosY - 3
        //       const position =  `${nextPosX}-${nextPosY}`
        //       if(position !== game.nB){
        //         updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
        //       }
        //     }
        //   }
        //   else if(curPlayer.symbol === "nB"){
        //     let positionNB = game.nB.split('-')
        //     curPosX = parseInt(positionNB[0])
        //     curPosY = parseInt(positionNB[1])
        //     if(curPosX < 9){
        //       nextPosX = curPosX + 3
        //       nextPosY = curPosY + 3
        //       const position = `${nextPosX}-${nextPosY}`
        //       if(position !== game.nA){
        //         updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
        //       }
        //     }
        //   }
        //   break
          case 32: //space
          if(curPlayer.symbol === "nA"){
            console.log(game.nA)
            let positionNA = game.nA.split('-')
            curPosX = parseInt(positionNA[0])
            curPosY = parseInt(positionNA[1])
            if(curPosX < 14){
              nextPosX = curPosX
              nextPosY = curPosY + 3
              const position =  `${nextPosX}-${nextPosY}`
              if(position !== game.nB){
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
              }
            }
          }
          else if(curPlayer.symbol === "nB"){
            let positionNB = game.nB.split('-')
            curPosX = parseInt(positionNB[0])
            curPosY = parseInt(positionNB[1])
            if(curPosX < 14){
              nextPosX = curPosX
              nextPosY = curPosY - 3
              const position = `${nextPosX}-${nextPosY}`
              if(position !== game.nA){
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
              }
            }
          }
          break

          case 38: //up-jump
          if(curPlayer.symbol === "nA"){
            let positionNA = game.nA.split('-')
            curPosX = parseInt(positionNA[0])
            curPosY = parseInt(positionNA[1])
            if(curPosX > 2){
              console.log('before up',curPosY)
              nextPosX = curPosX - 1
              nextPosY = curPosY + 1
              console.log('after up',nextPosY)
              const position =  `${nextPosX}-${nextPosY}`
              console.log('before call action up',position)
              if(position !== game.nB){
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB)
              }
              setTimeout(() => {
                console.log('state before down ', game.nA)
                //let positionNA1 = game.nA.split('-')
                let positionNA1 = position.split('-')
                let curPosXb = parseInt(positionNA1[0])
                let curPosYb = parseInt(positionNA1[1])
                if(curPosXb = 3){
                  console.log('before down',curPosYb)
                  let nextPosXb = curPosXb + 1
                  let nextPosYb = curPosYb + 1
                  console.log('after down',curPosYb)
                  const positionA =  `${nextPosXb}-${nextPosYb}`
                  console.log('before call action down', positionA)
                  if(positionA !== game.nB){
                    updatePlayerPosition(game.id, positionA, game.board, "nA", game.nB)
                  }
                }
              }, 100);
            }
          }
          if(curPlayer.symbol === "nB"){
            let positionNB = game.nB.split('-')
            curPosX = parseInt(positionNB[0])
            curPosY = parseInt(positionNB[1])
            if(curPosX > 2){
              console.log('before up',curPosY)
              nextPosX = curPosX - 1
              nextPosY = curPosY - 1
              console.log('after up',nextPosY)
              const position =  `${nextPosX}-${nextPosY}`
              console.log('before call action up',position)
              if(position !== game.nA){
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
              }
              
            setTimeout(() => {
                console.log('state before down ', game.nB)
                //let positionNA1 = game.nA.split('-')
                let positionNB1 = position.split('-')
                let curPosXb = parseInt(positionNB1[0])
                let curPosYb = parseInt(positionNB1[1])
                if(curPosXb = 3){
                  console.log('before down',curPosYb)
                  let nextPosXb = curPosXb + 1
                  let nextPosYb = curPosYb - 1
                  console.log('after down',curPosYb)
                  const positionB =  `${nextPosXb}-${nextPosYb}`
                  console.log('before call action down', positionB)
                  if(positionB !== game.nA){
                    updatePlayerPosition(game.id, positionB, game.board, "nB", game.nA)
                  }
                }
              }, 100);
            }
          }
          break

        default:
    }
}

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  componentDidMount(){
    document.addEventListener("keyUp", this.moveOnBoard, false)
    // this.refs.divScreen.focus()
  }


  joinGame = () => this.props.joinGame(this.props.game.id)

  /*makeMove = (toRow, toCell, fromRow, fromCell) => {
    const {game, updateGame} = this.props
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    console.log(game.turn)
    updateGame(game.id, board)
  }*/

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

    return (<div className="outer-paper" >
      <h4>
        GAME nº {game.id} - STATUS: {game.status}
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

    

      {
         
        game.status !== 'pending' &&
        <div className="game-bg" onKeyUp={this.moveOnBoard} tabIndex="-1"  ref="divScreen" >
          <Board board={game.board} nA={game.nA} nB={game.nB} />
        </div>
        
      }
       {/* {console.log('game board', game.board)}
      <button name="ArrowRight" onClick={this.moveOnBoard}>right</button>
      <button name="ArrowLeft" onClick={this.moveOnBoard}>left</button>
      <button name="ArrowUp" onClick={this.moveOnBoard}>up</button>
      <button name="ArrowDown" onClick={this.moveOnBoard}>down</button> */}
      </div>)
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
