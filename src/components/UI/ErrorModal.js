import React from "react";
import { useState } from "react";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  const skills = [
    "At least 1 uppercase",
    "At least 1 lowercase",
    "At least 1 figure",
    "At least 1 special character - !@#$%^&*()",
    "At least 8 characters long",
  ];
  const [selected, setSelected] = useState(
    localStorage.getItem("updatedlist") == null
      ? ""
      : JSON.parse(localStorage.getItem("updatedlist"))
  );

  const handleCheckboxUpdate = (e) => {
    const selectedItem = e.target.value;

    const updatedList = [...selected];

    if (selected.includes(selectedItem)) {
      updatedList.splice(selected.indexOf(selectedItem), 1);
    } else {
      updatedList.push(selectedItem);
    }

    setSelected(updatedList);
    localStorage.setItem("updatedlist", JSON.stringify(updatedList));
  };
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>SETTINGS MODAL</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <div className="space-y-5 px-8">
          {skills.map((item, index) => {
            return (
              <div className="relative flex items-start" key={index}>
                <div className="flex h-5 items-center">
                  <input
                    id={item}
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    value={item}
                    checked={selected.includes(item) ? true : false}
                    onChange={handleCheckboxUpdate}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={item} className="font-medium text-gray-700">
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
