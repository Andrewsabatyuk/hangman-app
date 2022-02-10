import React, {useEffect} from 'react';
import { checkWin } from './checkWin';

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let finalMessage = '';
    let finalMessageWord = '';
    let playable = true;


    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        finalMessage = 'Congratulations! You won! 😃';
        playable = false;
      } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
        finalMessage = 'Unfortunately you lost. 😕';
        finalMessageWord = `...the word was: ${selectedWord}`;
        playable = false;
      }
    
      useEffect(() => {
        setPlayable(playable);
      });

    return (
    //   < !--Container for final message-- >
        <div className='popup-container' style={finalMessage !== '' ? {display:'flex'} : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
  )
};

export default Popup;
