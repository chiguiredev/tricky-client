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
  const handleLeaveGame = () => {
    socketConnection.emit('leave_game', {gameKey: key, userKey: selfSocketId});
  };

  const handleStartGame = () => {
    /*var conn = peer.connect(currentGames[key].playerTwo)
    conn.on('open', () => {
      conn.send('hi!');
    });*/
  };


  let deleteable = false;
  let joinable = true;
  let leaveable = false;
  let startable = false;


  if (currentGames[key].creator !== selfSocketId) {
    deleteable = true;
  } else {
    joinable = false;
  }

  if (currentGames[key].playerTwo !== undefined) {
    joinable = false;
    if (currentGames[key].playerTwo === selfSocketId){
      leaveable = true;
    }
  }

  if (currentGames[key].creator === selfSocketId && currentGames[key].playerTwo !== undefined) {
    startable = true;
  }

  return (
    <div className="game-row" key={key}>
      <p>{`Peer: `}</p>
      <p>{`Player one: ${currentUsers[currentGames[key].playerOne].name}`}</p>
      <p>{`Player one key: ${currentGames[key].playerOne}`}</p>
      <p>{`Game key: ${key}`}</p>

      <p>
        {`Player two: ${
          (currentGames[key].playerTwo === undefined) ?
          '' :
          currentUsers[currentGames[key].playerTwo].name
        }`}
      </p>
      <p>
        {`Player two key: ${
          (currentGames[key].playerTwo === undefined) ?
          '' :
          currentGames[key].playerTwo
        }`}
      </p>
      <div className="game-actions">
        <button onClick={handleJoinGame} disabled={!joinable}>Join Game</button>
        <button onClick={handleLeaveGame} disabled={!leaveable}>Leave Game</button>
        <button onClick={handleDeleteGame} disabled={deleteable}>Delete Game</button>
        <button onClick={handleStartGame} disabled={!startable}>Start Game</button>
      </div>
    </div>
  );
};

export default GameRow;
