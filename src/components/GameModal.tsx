import React from 'react'
import './BoardStyles.css'
import { scoreCountObj, winnerMessage } from './GameBoard'

type handleResetFunction = () => void;
type handleQuitFunction = () => void;

type GameModalProps = {
  show: boolean; 
  message: React.ReactNode;
  handlereset: handleResetFunction;
  handlequit: handleQuitFunction;
  winnertitle: React.ReactNode;
}

const GameModal = (props: GameModalProps) => {

    if(!props.show) return null

    

  return (
    <div className='modal--container flexed'>
      <div className='modal flexed'>
        <div className='modal-content'>
          <div className='modal-header'>
            {props.winnertitle}
          </div>
          <>{props.message}</>
          <div className='modal--footer flexed btn--2--pane'>
              <button className='btn btn--modal btn--modal--quit' onClick={props.handlequit}>Quit</button>
              <button className='btn btn--modal btn--modal--next' onClick={props.handlereset}>Next Round</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameModal
