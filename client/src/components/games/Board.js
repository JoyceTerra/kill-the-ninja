import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <div
      id={`${rowIndex}-${cellIndex}`}
      className="one-single-div div-inactive"
      disabled={hasTurn}
     // onKeyPress={(e) => makeMove(e ,rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</div>
  )
}
 
export default ({board}) => board.map((cells, rowIndex) =>
  <div key={rowIndex}>
    {cells.map((symbol, cellIndex) => renderCel(rowIndex, cellIndex, symbol ,false))}
  </div>
)
