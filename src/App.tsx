import React from 'react';
import './App.css';
import { scrabbleScores } from './data';

function App() {
  const [word, setWord] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let score = 0;
    for (let i = 0; i < word.length; i++) {
      score += scrabbleScores[word[i]];
    }

    // check if word is empty
    if (word === '') {
      setScore(0);
      setError(false);
      return;
    }

    if (word.match(/^[a-zA-Z]+$/)) {
      // regex check if word contains only letters
      setScore(score);
      setError(false);
    } else {
      setScore(0);
      setError(true);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {error && (
          <p className='not-valid-word'>
            Only letters are allowed, no numbers or special characters.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Word
            <input type='text' value={word} placeholder='type word' onChange={handleChange} />
          </label>
          <input type='submit' value='Submit' />
          <p className='scribble-score'> Scrabble score: {score}</p>
        </form>
      </header>
    </div>
  );
}

export default App;
