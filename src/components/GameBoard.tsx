import React, { useCallback, useEffect, useState, useReducer } from 'react'
import './BoardStyles.css'
import {tileIconO, tileIconX, iconO, iconX, iconOSmall, iconXSmall, iconRefresh, outlineTileIconO, outlineTileIconX} from './Icons'
import {reducer, initialState} from './reducer'
//import { playerO, playerX, winLinesObj  } from './CkeckWinner'
import GameModal from './GameModal'
// import { winLinesObj } from './CkeckWinner'

export let tileArr: (string | React.ReactElement<SVGElement>)[] = [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ']
export let winnerArr: (string)[] = [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ']
export let scoreCountObj = {
  playerXWinCount: 0,
  draw: 0,
  playerOWinCount: 0
}

export let winnerMessage: React.ReactNode
export let winnerTitle: React.ReactNode
// const A = tileArr;

export const playerX: string[] = ['icon--tile--X', 'icon--tile--X', 'icon--tile--X']
export const playerO: string[] = ['icon--tile--O', 'icon--tile--O', 'icon--tile--O']

const GameBoard = () => {
  
  // const boardContainer = document.querySelector('container')

  // console.log('boardContainer', boardContainer)


  const [modalShow, setModalShow] = useState(false)  

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    let symbol: React.ReactNode;
    (state.moveCount+1) % 2 === 0 ? symbol = tileIconO : symbol = tileIconX
    tileArr[Number(event.currentTarget.dataset.index)] = symbol
    winnerArr[Number(event.currentTarget.dataset.index)] = symbol.props.className.split(" ")[2]

    dispatch({type: 'play'})
    event.currentTarget.disabled = true;
     declareWinner()
  }

  const declareWinner = () => {
    const winLinesObj: {[field: string]: string[]} = {
      'R1':[winnerArr[0],winnerArr[1],winnerArr[2]], 
      'R2':[winnerArr[3],winnerArr[4],winnerArr[5]], 
      'R3':[winnerArr[6],winnerArr[7],winnerArr[8]], 
      'C1':[winnerArr[0],winnerArr[3],winnerArr[6]], 
      'C2':[winnerArr[1],winnerArr[4],winnerArr[7]], 
      'C3':[winnerArr[2],winnerArr[5],winnerArr[8]],
      'D1':[winnerArr[0],winnerArr[4],winnerArr[8]], 
      'D2':[winnerArr[2],winnerArr[4],winnerArr[6]]
    }

    const winLinesObjByIndex: {[field: string]: number[]} = {
      'R1':[0,1,2], 
      'R2':[3,4,5], 
      'R3':[6,7,8], 
      'C1':[0,3,6], 
      'C2':[1,4,7], 
      'C3':[2,5,8],
      'D1':[0,4,8], 
      'D2':[2,4,6]
    }

    type paintWinLinesType = (color:string, outlineIcon: React.ReactElement<SVGElement>) => void

    const paintWinLines: paintWinLinesType = (color, outlineIcon) => {
      const symbolArr = Array.from(document.querySelectorAll('icon--tile--X') as TileArr)
      for(let key in winLinesObj) {
        if(winLinesObj[key][0] !== ' ' && winLinesObj[key][0] === winLinesObj[key][1] && winLinesObj[key][1] === winLinesObj[key][2]) {
          for(let winButtonIndex of winLinesObjByIndex[key]){
            arr[winButtonIndex].style.backgroundColor = color;
          }
          for(let winButtonIndex of winLinesObjByIndex[key]){
            // symbolArr[winButtonIndex].style.fill = '#1f3641';
            tileArr[winButtonIndex] = outlineIcon
          }

        }
      }
  }

    const winLineValues = Object.values(winLinesObj)

    const stringifiedWinLineValues = winLineValues.map((val) => val.join(" "))


    if(stringifiedWinLineValues.includes(playerX.join(" "))) {
      winnerMessage = <div className='message flexed'>
        <span className='message--icon'>{tileIconX}</span>
        <span className='message--text  flexed message--text--X'>TAKES THE ROUND</span>
        </div>
      winnerTitle = <h6 className='winner--title'>Player-X wins...</h6>

      scoreCountObj.playerXWinCount++
      setModalShow(true)
      paintWinLines('#31C3BD', outlineTileIconX)

      const boardContainer = document.querySelector('container')

      if(boardContainer && modalShow) {boardContainer.classList.add('faint')}
    }
    else if(stringifiedWinLineValues.includes(playerO.join(" "))) {
      winnerMessage = <div className='message flexed'>
        
        <span className='message--icon'>{tileIconO}</span>
        <span className='message--text flexed message--text--O'>TAKES THE ROUND</span>
        </div>

      winnerTitle = <h6 className='winner--title'>Player-O wins...</h6>
      scoreCountObj.playerOWinCount++
      setModalShow(true)
      paintWinLines('#F2B137', outlineTileIconO)

      const boardContainer = document.querySelector('container')

      if(boardContainer && modalShow) {boardContainer.classList.add('faint')}
    }
    else if(state.moveCount === 8 && 
      (!(stringifiedWinLineValues.includes(playerX.join(" "))) || 
      !(stringifiedWinLineValues.includes(playerX.join(" "))))) {
      winnerMessage = <div className='message--text flexed message--text-tied'>ROUND TIED</div>
      winnerTitle = null
      scoreCountObj.draw++
      setModalShow(true)
    }
  }

  type handleResetFunction = () => void;
  type TileArr = NodeListOf<HTMLButtonElement>;

  const handleQuit = () => {
      handleReset()
      scoreCountObj = {
        playerXWinCount: 0,
        draw: 0,
        playerOWinCount: 0
      }
    }

  const arr = Array.from(document.querySelectorAll('button.btn--tiles') as TileArr)

  const handleReset: handleResetFunction = () : void => {
    setModalShow(false)
     dispatch({type: 'reset'})
     tileArr = [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ']
     winnerArr = [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ']
     arr.forEach(tile => {
       tile.disabled = false
       tile.style.backgroundColor = '#1f3641'
      })
     
  }


  return (
    <div className='container flexed'>
      <div  className='board grid grid--3--cols'>
        <div className='tag'>{iconX}{iconO}</div>
        <button className='btn btn--top btn--top--player_turn'>
          {state.moveCount % 2 === 0 ? iconXSmall : iconOSmall}
          <span>  TURN</span>
        </button>
        <button className='btn btn--top btn--top--restart' onClick={handleReset}>{iconRefresh}</button>
        <div className='tiles grid grid--3--cols'>
          <button className='btn btn--tiles' data-index ='0' onClick={handleClick}>{state.A[0]}</button>
          <button className='btn btn--tiles' data-index ='1' onClick={handleClick}>{state.A[1]}</button>
          <button className='btn btn--tiles' data-index ='2' onClick={handleClick}>{state.A[2]}</button>
          <button className='btn btn--tiles' data-index ='3' onClick={handleClick}>{state.A[3]}</button>
          <button className='btn btn--tiles' data-index ='4' onClick={handleClick}>{state.A[4]}</button>
          <button className='btn btn--tiles' data-index ='5' onClick={handleClick}>{state.A[5]}</button>
          <button className='btn btn--tiles' data-index ='6' onClick={handleClick}>{state.A[6]}</button>
          <button className='btn btn--tiles' data-index ='7' onClick={handleClick}>{state.A[7]}</button>
          <button className='btn btn--tiles' data-index ='8' onClick={handleClick}>{state.A[8]}</button>
        </div>
        <button className='btn btn--btm btn--btm--p1_score'>X-SCORE <span className='score'>{scoreCountObj.playerXWinCount}</span></button>
        <button className='btn btn--btm btn--btm--ties'> TIES <span className='score'>{scoreCountObj.draw}</span></button>
        <button className='btn btn--btm btn--btm--p2_score'>O-SCORE <span className='score'>{scoreCountObj.playerOWinCount}</span></button>
      </div>
      <GameModal show={modalShow} message={winnerMessage} handlereset={handleReset} handlequit={handleQuit} winnertitle={winnerTitle}/>
    </div>
    
  )
}

export default GameBoard
