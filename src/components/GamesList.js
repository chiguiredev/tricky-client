import React from "react";
import GameRow from './GameRow';

const GamesList = ({
  currentGames,
  currentUsers,
  selfSocketId,
  socketConnection,
}) => {
  return (
    <div className="current-games">
      <h3>current games</h3>
      {Object.keys(currentGames).map(key => {
        return (
          <GameRow
            currentGames={currentGames}
            currentUsers={currentUsers}
            selfSocketId={selfSocketId}
            socketConnection={socketConnection}
            gameKey={key}
          />
        );
      })}
    </div>
  );
};

export default GamesList;
