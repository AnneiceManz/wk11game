import { useEffect, useState, useRef } from 'react'
import CardsArray from './components/CardsArray';
import ShuffleCards from './components/Shuffle';
import GameCard from './components/GameCard';
import './App.css';
import IMAGES from './components/images';



function App() {
  const [cards, setCards] = useState(() =>
  ShuffleCards(CardsArray.concat(CardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  // const [showModal, setShowModal] =useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false)
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length=== CardsArray.length) {
      // setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    };
  };

  const evalute = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type===cards[second].type) {
      setClearedCards((prev) => ({...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return
    }
    timeout.current = setTimeout(() => {
      setOpenCards([])
    }, 500)
  };

  const handleCardClick = (index) => {
    if (openCards.length===1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves ((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    };
  };

  useEffect(() => {
    let timeout=null;
    if (openCards.length === 2) {
      timeout = setTimeout(evalute, 300);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    return () => {
      clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    // setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(ShuffleCards(CardsArray.concat(CardsArray)));
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={IMAGES.stevenuniverselogo}alt="steven universe logo" width="300px"/>
        <h3>Play the Card Matching Game</h3>
        <div>
          Find two matching cards to make them vanish.
        </div>
      </header>
      <div className="container">
      {cards.map((card, index) => {
          return (
            <GameCard
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className='score'>
          <div className='moves'>
            <span className='bold'>Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div className='high-score'>
              <span className='bold'>Best Score:</span> {bestScore}
              </div>
          )}
        </div>
        <div className='restart'>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </footer>
    </div>
  );
}

export default App;