import React from 'react';
import './App.css';

const UserList = ({currentUsers}) => (
  <div className="current-users">
    <h3>current users</h3>
    {Object.keys(currentUsers).map(key => {
      return (
        <p key={key}>
          {`${currentUsers[key].name}:${key}`}
        </p>
      );
    })}
  </div>
);

const GamesList = ({currentGames, currentUsers}) => (
  <div className="current-games">
    <h3>current games</h3>
    {Object.keys(currentGames).map(key => {
      return (
        <p key={key}>
          {`${currentUsers[currentGames[key].creator].name}:${key}`}
        </p>
      );
    })}
  </div>
);

const App = ({socketConnection}) => {
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [currentGames, setCurrentGames] = React.useState([]);
  const inputElement = React.useRef(null);

  socketConnection.on('connect', () => {
    console.log(`connected: ${socketConnection.id}`);
    socketConnection.on('user_update', users => {
      setCurrentUsers(users);
    });

    socketConnection.on('game_update', games => {
      setCurrentGames(games)
    });
  });

  const handleNameChange = () => {
    const { value: inputNameValue } = inputElement.current;
    if (inputNameValue !== '') {
      socketConnection.emit('name_update', inputNameValue);
    }
  };

  const handleCreateGame = () => {
    socketConnection.emit('create_game');
  }

  return (
    <div className="App-header">
      hey im the app
      <input type="text" placeholder="name" ref={inputElement}/>
      <button onClick={handleNameChange}>
        change name
      </button>
      <button onClick={handleCreateGame}>
        create new game
      </button>
      <UserList currentUsers={currentUsers} />
      <GamesList currentGames={currentGames} currentUsers={currentUsers} />
    </div>
  );
}

export default App;
