import React from "react";

import Card from "../UI/Card";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      {props.users.length > 0 && (
        <ul>
          {props.users.map((user) => (
            <li key={user.id}>
              {user.email} {user.password}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default UsersList;
