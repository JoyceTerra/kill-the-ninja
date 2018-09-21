import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, nA, nB, wA, wB) => {
let numberA =  nA.split('-')
let numberB =  nB.split('-')
let weaponA = wA.split('-')
let weaponB = wB.split('-')


  return (
    <div
      id={`${rowIndex}-${cellIndex}`}
      className={
        (parseInt(weaponA[0]) === rowIndex &&  parseInt(weaponA[1]) === cellIndex) ?  'div-active-wa' : 'div-inactive' &&
        (parseInt(weaponB[0]) === rowIndex &&  parseInt(weaponB[1]) === cellIndex) ?  'div-active-wb' : 'div-inactive' &&
        (parseInt(numberA[0]) === rowIndex &&  parseInt(numberA[1]) === cellIndex) ?  'div-active-na' : 'div-inactive' &&
        (parseInt(numberB[0]) === rowIndex &&  parseInt(numberB[1]) === cellIndex) ?  'div-active-nb' : 'div-inactive' 
      }
      key={`${rowIndex}-${cellIndex}`}
    ></div>
  )
}
 
export default ({board, nA, nB, wA, wB}) => board.map((row, rowIndex) =>
  <div className="div-row" key={rowIndex}>
    {row.map((cell, cellIndex) => renderCel(rowIndex, cellIndex, nA, nB, wA, wB))}
  </div>
)
