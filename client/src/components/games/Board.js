import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, nA, nB) => {
let numberA =  nA.split('-')
let numberB =  nB.split('-')


  // console.log("row", rowIndex)
  // console.log("cell", cellIndex)

  // console.log("nAX", parseInt(numberA[0]))
  // console.log("nAY",parseInt(numberA[1]))
  // console.log("nBX", parseInt(numberB[0]))
  // console.log("nBY",parseInt(numberB[1]))

  
  return (
    <div
      id={`${rowIndex}-${cellIndex}`}
      className={(parseInt(numberA[0]) === rowIndex &&  parseInt(numberA[1]) === cellIndex) ?  'div-active' : 'div-inactive' && (parseInt(numberB[0]) === rowIndex &&  parseInt(numberB[1]) === cellIndex) ?  'div-active' : 'div-inactive'}
      key={`${rowIndex}-${cellIndex}`}
    >-</div>
  )
}
 
export default ({board, nA, nB}) => board.map((row, rowIndex) =>
  <div key={rowIndex}>
    {row.map((cell, cellIndex) => renderCel(rowIndex, cellIndex, nA, nB))}
  </div>
)
