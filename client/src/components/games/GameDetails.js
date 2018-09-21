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
    let nextPosWX
    let nextPosWY
    let curPosWX = 0
    let curPosWY = 0

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
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB,game.weapon1nA, game.weapon1nB)
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
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA,game.weapon1nA, game.weapon1nB)
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
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB,game.weapon1nA, game.weapon1nB)
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
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA,game.weapon1nA, game.weapon1nB)
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
            let positionWA = game.nA.split('-')
            curPosWX = parseInt(positionWA[0])
            curPosWY = parseInt(positionWA[1]) 
            console.log(game.weapon1nB)
            if(curPosWY < 14){
              console.log('before up weaponA',curPosWY)
              nextPosWX = curPosWX 
              nextPosWY = curPosWY + 1
              console.log('after up weaponA',nextPosWY)
              const positionWeapon1 =  `${nextPosWX}-${nextPosWY}`
              console.log('before call action up weaponA', positionWeapon1)
              updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionWeapon1, game.weapon1nB)
              
              if(game.nB !== game.weapon1nA){
               setTimeout(() => {
                let positionNA1 = positionWeapon1.split('-')
                let curPosXb = parseInt(positionNA1[0])
                let curPosYb = parseInt(positionNA1[1])
                let nextPosXb = curPosXb
                let nextPosYb = curPosYb + 1
                const positionA =  `${nextPosXb}-${nextPosYb}`
                updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionA, game.weapon1nB)
               if(game.nB !== game.weapon1nA){
                setTimeout(() => {
                  let positionNA2 = positionA.split('-')
                  let curPosXc = parseInt(positionNA2[0])
                  let curPosYc = parseInt(positionNA2[1])
                  let nextPosXc = curPosXc
                  let nextPosYc = curPosYc + 1
                  const positionB =  `${nextPosXc}-${nextPosYc}`
                  updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionB, game.weapon1nB)
                  if(game.nB !== game.weapon1nA){
                    setTimeout(() => {
                      let positionNA3 = positionB.split('-')
                      let curPosXd = parseInt(positionNA3[0])
                      let curPosYd= parseInt(positionNA3[1])
                      let nextPosXd = curPosXd
                      let nextPosYd = curPosYd + 1
                      const positionC =  `${nextPosXd}-${nextPosYd}`
                      updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionC, game.weapon1nB)
                      if(game.nB !== game.weapon1nA){
                        setTimeout(() => {
                          let positionNA4 = positionC.split('-')
                          let curPosXe = parseInt(positionNA4[0])
                          let curPosYe= parseInt(positionNA4[1])
                          let nextPosXe = curPosXe
                          let nextPosYe = curPosYe + 1
                          const positionD =  `${nextPosXe}-${nextPosYe}`
                          updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionD, game.weapon1nB)
                          if(game.nB !== game.weapon1nA){
                            setTimeout(() => {
                              let positionNA5 = positionD.split('-')
                              let curPosXf = parseInt(positionNA5[0])
                              let curPosYf= parseInt(positionNA5[1])
                              let nextPosXf = curPosXf
                              let nextPosYf = curPosYf + 1
                              const positionE =  `${nextPosXf}-${nextPosYf}`
                              updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionE, game.weapon1nB)
                              if(game.nB !== game.weapon1nA){
                                setTimeout(() => {
                                  let positionNA6 = positionE.split('-')
                                  let curPosXg = parseInt(positionNA6[0])
                                  let curPosYg= parseInt(positionNA6[1])
                                  let nextPosXg = curPosXg
                                  let nextPosYg = curPosYg + 1
                                  const positionF =  `${nextPosXg}-${nextPosYg}`
                                  updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionF, game.weapon1nB)
                                  if(game.nB !== game.weapon1nA){
                                    setTimeout(() => {
                                      let positionNA7 = positionF.split('-')
                                      let curPosXh = parseInt(positionNA7[0])
                                      let curPosYh = parseInt(positionNA7[1])
                                      let nextPosXh = curPosXh
                                      let nextPosYh = curPosYh + 1
                                      const positionG =  `${nextPosXh}-${nextPosYh}`
                                      updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionG, game.weapon1nB)
                                      if(game.nB !== game.weapon1nA){
                                        setTimeout(() => {
                                          let positionNA8 = positionG.split('-')
                                          let curPosXi = parseInt(positionNA8[0])
                                          let curPosYi = parseInt(positionNA8[1])
                                          let nextPosXi = curPosXi
                                          let nextPosYi = curPosYi + 1
                                          const positionH =  `${nextPosXi}-${nextPosYi}`
                                          updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionH, game.weapon1nB)
                                          if(game.nB !== game.weapon1nA){
                                            setTimeout(() => {
                                              let positionNA9= positionH.split('-')
                                              let curPosXj = parseInt(positionNA9[0])
                                              let curPosYj = parseInt(positionNA9[1])
                                              let nextPosXj = curPosXj
                                              let nextPosYj = curPosYj + 1
                                              const positionI =  `${nextPosXj}-${nextPosYj}`
                                              updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionI, game.weapon1nB)
                                              if(game.nB !== game.weapon1nA){
                                                setTimeout(() => {
                                                  let positionNA10= positionI.split('-')
                                                  let curPosXk = parseInt(positionNA10[0])
                                                  let curPosYk = parseInt(positionNA10[1])
                                                  let nextPosXk = curPosXk
                                                  let nextPosYk = curPosYk + 1
                                                  const positionJ =  `${nextPosXk}-${nextPosYk}`
                                                  updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionJ, game.weapon1nB)
                                                  if(game.nB !== game.weapon1nA){
                                                    setTimeout(() => {
                                                      let positionNA11= positionJ.split('-')
                                                      let curPosXl = parseInt(positionNA11[0])
                                                      let curPosYl = parseInt(positionNA11[1])
                                                      let nextPosXl = curPosXl
                                                      let nextPosYl = curPosYl + 1
                                                      const positionK =  `${nextPosXl}-${nextPosYl}`
                                                      updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionK, game.weapon1nB)
                                                      if(game.nB !== game.weapon1nA){
                                                        setTimeout(() => {
                                                          let positionNA12= positionK.split('-')
                                                          let curPosXm = parseInt(positionNA12[0])
                                                          let curPosYm = parseInt(positionNA12[1])
                                                          let nextPosXm = curPosXm
                                                          let nextPosYm = curPosYm + 1
                                                          const positionL =  `${nextPosXm}-${nextPosYm}`
                                                          updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionL, game.weapon1nB)
                                                       if(game.nB !== game.weapon1nA){
                                                        setTimeout(() => {
                                                          let positionNA13= positionL.split('-')
                                                          let curPosXn = parseInt(positionNA13[0])
                                                          let curPosYn= parseInt(positionNA13[1])
                                                          let nextPosXn = curPosXn
                                                          let nextPosYn = curPosYn + 1
                                                          const positionM =  `${nextPosXn}-${nextPosYn}`
                                                          updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionM, game.weapon1nB)
                                                          // if(game.nB !== game.weapon1nA){
                                                          //   setTimeout(() => {
                                                          //     let positionNA14= positionM.split('-')
                                                          //     let curPosXo= parseInt(positionNA14[0])
                                                          //     let curPosYo= parseInt(positionNA14[1])
                                                          //     let nextPosXo = curPosXo
                                                          //     let nextPosYo = curPosYo + 1
                                                          //     const positionN =  `${nextPosXo}-${nextPosYo}`
                                                          //     updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionN, game.weapon1nB)
                                                          //  }, 100);
                                                          // }
                                                        
                                                       }, 100);
                                                      }else{
                                                        const life = -1
                                                        console.log('lve', life)
                                                        //updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionWeapon1, game.weapon1nB)
                                                      }
                                                    }, 100);
                                                  }else{
                                                    const life = -1
                                                    console.log('lve', life)
                                                    //updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionWeapon1, game.weapon1nB)
                                                  }
                                                   }, 100);
                                                  }
                                               }, 100);
                                              }
                                           }, 100);
                                          }
                                       }, 100);
                                      }
                                   }, 100);
                                  }
                               }, 100);
                              }
                           }, 100);
                          }
                       }, 100);
                      }
                   }, 100);
                  }
               }, 100);
              }
              }, 100);
            }else{
              const life = -1
              console.log('lve', life)
              //updatePlayerPosition(game.id, game.nA, game.board, "nA", game.nB, positionWeapon1, game.weapon1nB)
            }
            }}
      
          if(curPlayer.symbol === "nB"){
          //   let positionNB = game.nB.split('-')
          //   curPosX = parseInt(positionNB[0])
          //   curPosY = parseInt(positionNB[1])
          //   if(curPosX > 2){
          //     console.log('before up',curPosY)
          //     nextPosX = curPosX - 1
          //     nextPosY = curPosY - 1
          //     console.log('after up',nextPosY)
          //     const position =  `${nextPosX}-${nextPosY}`
          //     console.log('before call action up',position)
          //     if(position !== game.nA){
          //       updatePlayerPosition(game.id, position, game.board, "nB", game.nA)
          //     }
              
          //   setTimeout(() => {
          //       console.log('state before down ', game.nB)
          //       //let positionNA1 = game.nA.split('-')
          //       let positionNB1 = position.split('-')
          //       let curPosXb = parseInt(positionNB1[0])
          //       let curPosYb = parseInt(positionNB1[1])
          //       if(curPosXb = 3){
          //         console.log('before down',curPosYb)
          //         let nextPosXb = curPosXb + 1
          //         let nextPosYb = curPosYb - 1
          //         console.log('after down',curPosYb)
          //         const positionB =  `${nextPosXb}-${nextPosYb}`
          //         console.log('before call action down', positionB)
          //         if(positionB !== game.nA){
          //           updatePlayerPosition(game.id, positionB, game.board, "nB", game.nA)
          //         }
          //       }
          //     }, 100);
          //}
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
                updatePlayerPosition(game.id, position, game.board, "nA", game.nB, game.weapon1nA, game.weapon1nB)
                
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
                    updatePlayerPosition(game.id, positionA, game.board, "nA", game.nB, game.weapon1nA, game.weapon1nB)
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
                updatePlayerPosition(game.id, position, game.board, "nB", game.nA,game.weapon1nA, game.weapon1nB)
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
                    updatePlayerPosition(game.id, positionB, game.board, "nB", game.nA,game.weapon1nA, game.weapon1nB)
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
          <Board board={game.board} nA={game.nA} nB={game.nB} wA={game.weapon1nA} wB={game.weapon1nB} />
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
