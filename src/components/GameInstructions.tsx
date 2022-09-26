import React, { useState } from 'react'
import './BoardStyles.css'

// type handleHideInstructions = () => void;
// type handleQuitFunction = () => void;

// type InstructionsModalProps = {
//   showInstructions: boolean; 
//   handleHideInstr: handleHideInstructions;
// }

const InstructionsModal = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const [showInstructions, setShowInstructions] = useState(true)   
  const [instruction, setInstruction] = useState('')

  

  const instructionObj: Record<string, string> = {
    '1': 'Click next to read the instructions...',
    '2': '1. The game involves two players (X and O)',
    '3': '2. First player to align symbols vertically, horizontally or diagonally wins the round',
    '4': '3. Done reading the instructions? Click start to begin...',

  }

  // switch(pageNumber) {
  //   case 1: {
  //     setInstruction()
  //     break
  //   }
  //   case 2: {
  //     setInstruction('The game involves two players (X and O)')
  //     break
  //   }
  //   case 3: {
  //     setInstruction('First player to align symbols vertically, horizontally or diagonally wins the round')
  //     break
  //   }
  //   case 4: {
  //     setInstruction('Done reading the instructions? Click start to begin...')
  //     break
  //   }
  // }

  const incrementPageNo = () => {
    pageNumber < 4 ? setPageNumber(pageNumber + 1) : setShowInstructions(false)

  }
  const decrementPageNo = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1)
  }

    if(!showInstructions) return null

  return (
    <div className='instruction--container flexed'>
      <div className='instruction flexed'>
        <div className='instruction-content'>
          <div className='instruction-header'>
            {pageNumber === 1 ? 'Welcome to tic-tac-toe game' : 'Instructions'}
          </div>
          <div className='instruction-message'>{instructionObj[pageNumber]}</div>
          <div className='instruction--footer flexed btn--2--pane'>
            { pageNumber > 1 && <button className='btn btn--instruction btn--instruction--prev' onClick={decrementPageNo}>Previous</button> }
            <button className='btn btn--instruction btn--instruction--next' onClick={incrementPageNo}>{pageNumber === 4 ? 'Start' : 'Next'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal