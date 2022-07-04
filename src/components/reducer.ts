import {tileArr, scoreCountObj } from './GameBoard'

type GameState = {
    moveCount: number;
    A: (string | React.ReactNode)[];
    scoresCounter: {
      playerXWinCount: number;
      draw: number;
      playerOWinCount: number;
    }
}

type GameAction ={
    type: 'play' | 'reset';
}

export const initialState: GameState = {
  moveCount: 0,
  A: [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
  scoresCounter: {
    playerXWinCount: 0,
    draw: 0,
    playerOWinCount: 0
  }
}

export function reducer(state: GameState, action: GameAction) {
    switch(action.type){
        case 'play':
            return {...state, 
                moveCount: state.moveCount + 1, 
                A: tileArr,
                scoresCounter: scoreCountObj
                }
        case 'reset':
            return initialState
        default:
            return state
    }
}
