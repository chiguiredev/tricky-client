import React from "react";

const UserList = ({ currentUsers }) => (
  <div className="current-users">
    <h3>current users</h3>
    {Object.keys(currentUsers).map(key => {
      return <p key={key}>{`${currentUsers[key].name}: ${key}`}</p>;
    })}
  </div>
);

export default UserList;
