import React from 'react';

const GameRow = ({
  currentGames,
  currentUsers,
  selfSocketId,
  gameKey: key,
  socketConnection,
}) => {

  const handleDeleteGame =  () => {
    socketConnection.emit('delete_game_by_user', {gameKey: key});
  };

  const handleJoinGame = () => {
    socketConnection.emit('join_game', {gameKey: key, userKey: selfSocketId});
  };

  let deleteable = false;
  let joinable = true;
  let startable = false;

  if (currentGames[key].creator !== selfSocketId) {
    deleteable = true;
  } else {
    joinable = false;
  }

  if (currentGames[key].playerTwo !== '') {
    joinable = false;
  }

  if (
    currentGames[key].playerOne === selfSocketId
    ||
    currentGames[key].playerTwo === selfSocketId
  ) {
    startable = true;
  }

  return (
    <div className="game-row" key={key}>
      <p>{`Player one: ${currentUsers[currentGames[key].playerOne].name}`}</p>
      <p>{`Player one key: ${currentGames[key].playerOne}`}</p>
      <p>{`Game key: ${key}`}</p>

      <p>
        {`Player two: ${
          currentGames[key].playerTwo === '' ?
          '' :
          currentUsers[currentGames[key].playerTwo].name
        }`}
      </p>
      <p>
        {`Player two key: ${
          currentGames[key].playerTwo === '' ?
          '' :
          currentGames[key].playerTwo
        }`}
      </p>
      <div className="game-actions">
        <button onClick={handleJoinGame} disabled={!joinable}>Join Game</button>
        <button onClick={handleDeleteGame} disabled={deleteable}>Delete Game</button>
        <button disabled={!startable}>start Game</button>
      </div>
    </div>
  );
};

export default GameRow;
