import React from 'react'

const GameHeader = ({score,move,resetGame}) => {
  return (
    <div className='game-header'>
        <h1>Kinus memory game</h1>
        <div className='stats'>
            <div className='stat-item'>
                <span className='stat-label'>Score:</span>
                <span className='stat-value'>{score}</span>

            </div>
            <div className='stat-item'>
               <span className='stat-label'>Move:</span>
                <span className='stat-value'>{move}</span>
            </div> 
        </div>
        <button className='reset-btn' onClick={resetGame}>New Game</button>
    </div>
    
  )
}

export default GameHeader 