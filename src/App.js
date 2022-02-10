import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Figure from './components/Figure.js';
import WrongLetters from './components/WrongLetters.js';
import Word from './components/Word.js';
import Popup from './components/Popup.js';
import Notification from './components/Notification.js';
import {showNotification as show} from './components/showNotification.js';
import './App.css';


const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

useEffect(() =>{
  const handleKeydown = event => {
    const {key, keyCode} = event;
    if(playable && keyCode >= 65 && keyCode <= 90){
      const letter = key.toLowerCase();

      if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
         setCorrectLetters(currentLetter => [...currentLetter, letter])
        } else{
          show(setShowNotification)
        }
      } else{
        if(!wrongLetters.includes(letter)){
          setWrongLetters(wrongLetters => [...wrongLetters, letter])
        }else{
          show(setShowNotification)
        }
      }
    }
  }

  window.addEventListener('keydown', handleKeydown)
  return () => window.removeEventListener('keydown', handleKeydown)
}, [correctLetters, wrongLetters, playable])

  function playAgain(){
    setPlayable(true);
    // empty array
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

    return (
      <div className="App">
        <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
        <Notification showNotification={showNotification} />
      </div>
    );
  }

export default App;
