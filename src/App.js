import React from "react";
import "./App.css";
import GamesList from "./components/GamesList";
import UserList from "./components/UserList";
import UserControls from "./components/UserControls";

const initialState = {
  currentUsers: [],
  currentGames: [],
  selfSocketId: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return {
        ...state,
        currentUsers: action.payload
      };
    case "UPDATE_GAMES":
      return {
        ...state,
        currentGames: action.payload
      };
    case "UPDATE_SELF_SOCKET_ID":
      return {
        ...state,
        selfSocketId: action.payload
      };
    default:
      throw new Error("the action type is not defined in the reducer");
  }
};

const App = ({ socketConnection }) => {
  // create the store for the entire app
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // get state from store
  const {
    currentUsers,
    currentGames,
    selfSocketId
  } = state;

  // handle incoming messages from server
  socketConnection.on("connect", () => {
    console.log(`connected: ${socketConnection.id}`);

    // actulizando la variable state.selfSocketId
    dispatch({
      type: "UPDATE_SELF_SOCKET_ID",
      payload: socketConnection.id
    });

    // Update users on server broadcast
    socketConnection.on("user_update", users => {
      dispatch({
        type: "UPDATE_USERS",
        payload: users
      });
    });

    // Update games on sever broadcast
    socketConnection.on("game_update", games => {
      dispatch({
        type: "UPDATE_GAMES",
        payload: games
      });
    });
  });

  return (
    <div className="app-main-container">
      <UserControls
        socketConnection={socketConnection}
        selfSocketId={selfSocketId}
      />
      <UserList currentUsers={currentUsers} />
      <GamesList
        selfSocketId={selfSocketId}
        currentGames={currentGames}
        currentUsers={currentUsers}
        socketConnection={socketConnection}
      />
    </div>
  );
};

export default App;
