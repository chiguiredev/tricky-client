import React from "react";

const GamesList = ({ currentGames, currentUsers }) => (
  <div className="current-games">
    <h3>current games</h3>
    {Object.keys(currentGames).map(key => {
      return (
        <div className="game-row" key={key}>
          <p>{`${currentUsers[currentGames[key].creator].name}: ${key}`}</p>
          <button>Join Game</button>
          <button>Delete Game</button>
          <button>start Game</button>
        </div>
      );
    })}
  </div>
);

export default GamesList;
