import React from "react";

const UserControls = ({ socketConnection, selfSocketId }) => {
  const inputElement = React.useRef(null);
  const [userName, setUserName] = React.useState("Change you user name!");

  const handleNameChange = () => {
    const { value: inputNameValue } = inputElement.current;
    if (inputNameValue !== "") {
      socketConnection.emit("name_update", inputNameValue);
      setUserName(inputNameValue);
    }
  };

  const handleCreateGame = () => {
    socketConnection.emit("create_game");
  };

  return (
    <div className="user-controls">
      <h3>my data</h3>
      <span>{userName}</span>
      <span>{selfSocketId}</span>
      <input type="text" placeholder="name" ref={inputElement} />
      <button onClick={handleNameChange}>change name</button>
      <button onClick={handleCreateGame}>create new game</button>
    </div>
  );
};

export default UserControls;
