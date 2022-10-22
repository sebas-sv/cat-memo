import { useState, useEffect } from "react";
import Images from './Images';
import './App.css';

function App() {
  const [isInit, setIsInit] = useState(true);
  const [cards, setCards] = useState(shuffleImages(Images));
  const [clicks, setClicks] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

  useEffect(() => {
    if (isInit) {
      setTimeout(() => {
        setIsInit(false);
      }, 3000);
    }
  }, [isInit]);

  function shuffleImages(Images) {
    const allImages = [...Images, ...Images];
    return allImages.sort(() => 0.5 - Math.random());
  }

  function handleClick(index) {
    if (isFinish) {
      resetGame();
    }

    const isActive = activeCards.includes(index);
    const isFound = foundPairs.includes(index);

    if (isInit || isActive || isFound) {
      return;
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);

      setClicks(clicks + 1);
    }

    if (activeCards.length === 1) {
      setActiveCards([...activeCards, index]);

      const firstImage = cards[activeCards[0]];
      const secondImage = cards[index];

      if (foundPairs.length + 2 === cards.length) {
        setIsFinish(true);
      }

      if (firstImage === secondImage) {
        setFoundPairs([...foundPairs, activeCards[0], index]);
      }

      setTimeout(() => {
        setActiveCards([]);
      }, 800);

      setClicks(clicks + 1);
    }
  }

  function resetGame() {
    setCards(shuffleImages(Images));
    setFoundPairs([]);
    setIsFinish(false);
    setClicks(0);
    setIsInit(true);
  }


  return (
    <div>

      <div className="board">
        {cards.map((card, index) => {
          const iShownStyle = (activeCards.includes(index) || foundPairs.includes(index) || isInit) ? ' flipped' : '';
          const isFoundStyle = foundPairs.includes(index) ? ' found' : '';

          return (
            <div key={index} className={"card-outer" + iShownStyle + isFoundStyle} onClick={() => handleClick(index)}>
              <div className="card">
                <div className="frontside">
                  <img src={card} alt="" />
                </div>
                <div className="backside" />
              </div>
            </div>
          );

        })}
      </div>

      <div className="stats">
        {isFinish && (
          <div className="text">
            <p>You have found all cats in {clicks} clicks, congratulations! Click any card to play again</p>
          </div>
        )}
        {!isFinish && (
          <div className="text">
            <p>{clicks} clicks and {foundPairs.length / 2} found cats</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;
