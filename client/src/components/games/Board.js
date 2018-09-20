import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, nA, nB) => {
let numberA =  nA.split('-')
let numberB =  nB.split('-')


  return (
    <div
      id={`${rowIndex}-${cellIndex}`}
      className={(parseInt(numberA[0]) === rowIndex &&  parseInt(numberA[1]) === cellIndex) ?  'div-active-na' : 'div-inactive' && (parseInt(numberB[0]) === rowIndex &&  parseInt(numberB[1]) === cellIndex) ?  'div-active-nb' : 'div-inactive'}
      key={`${rowIndex}-${cellIndex}`}
    ></div>
  )
}
 
export default ({board, nA, nB}) => board.map((row, rowIndex) =>
  <div key={rowIndex}>
    {row.map((cell, cellIndex) => renderCel(rowIndex, cellIndex, nA, nB))}
  </div>
)
