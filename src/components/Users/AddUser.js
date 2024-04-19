import React, { useState } from "react";
import Card from "../UI/Card";
import "../UI/index.css";
import "../UI/buttonnew.css";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const list = localStorage.getItem("updatedlist");
  if (list === null || list.length === 0) {
    const getError = "true";
    localStorage.setItem("getError", getError);
  }
  const [password, setPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [error, setError] = useState(
    localStorage.getItem("getError") === false
      ? false
      : localStorage.getItem("getError")
  );

  const [errormodal, seterrormodal] = useState(
    localStorage.getItem("getError") === false
      ? false
      : localStorage.getItem("getError")
  );

  const addUserHandler = (event) => {
    event.preventDefault();

    props.onAddUser(enteredEmail, password);
    setEnteredEmail("");
    setPassword("");
  };

  function clearemail(e) {
    console.log(enteredEmail);
    const target = e.target.value;
    console.log(target);
    if (target === "" || !target.includes("@") || target.trim().length === 0) {
      const emailcorrect = "false";
      localStorage.setItem("setemailcorrect", JSON.stringify(emailcorrect));
      setEnteredEmail(e.target.value);
    } else {
      const emailcorrect = "true";
      localStorage.setItem("setemailcorrect", JSON.stringify(emailcorrect));
      setEnteredEmail(e.target.value);
    }
  }

  function clearpassword(e) {
    const target = e.target.value;

    const strengthpercentage = JSON.parse(
      localStorage.getItem("strengthpercent")
    );

    if (
      target === "" ||
      target.trim().length === 0 ||
      strengthpercentage !== "100%"
    ) {
      const passwordcorrect = "false";
      localStorage.setItem(
        "setpasswordcorrect",
        JSON.stringify(passwordcorrect)
      );
      setPassword(e.target.value);
    } else {
      const passwordcorrect = "true";
      localStorage.setItem(
        "setpasswordcorrect",
        JSON.stringify(passwordcorrect)
      );
      setPassword(e.target.value);
    }
  }

  const errorHandler = () => {
    const forerror = JSON.parse(localStorage.getItem("updatedlist"));
    console.log(forerror);
    if (forerror === null || forerror.length === 0) {
      setError("true");
      seterrormodal("false");
      const getError = "true";
      localStorage.setItem("getError", getError);
    } else {
      seterrormodal("false");
      setError("false");
      const getError = "false";
      localStorage.setItem("getError", getError);
    }
  };

  function openSettings() {
    setError("true"); /* setError("true"); */
    seterrormodal("true");
    const editError = "true";
    localStorage.setItem("getError", editError);
  }

  /*   FOR PASSWORD STRENGTH METER    */

  const calculatePasswordStrength = () => {
    const strengthCheck = JSON.parse(localStorage.getItem("updatedlist"));
    let strength = 0;
    if (
      password.length >= 8 &&
      strengthCheck.includes("At least 8 characters long")
    ) {
      strength += 1;
    }
    if (
      password.match(/[a-z]+/) &&
      strengthCheck.includes("At least 1 lowercase")
    ) {
      strength += 1;
    }
    if (
      password.match(/[A-Z]+/) &&
      strengthCheck.includes("At least 1 uppercase")
    ) {
      strength += 1;
    }
    if (
      password.match(/[0-9]+/) &&
      strengthCheck.includes("At least 1 figure")
    ) {
      strength += 1;
    }
    if (
      password.match(/[^a-zA-Z0-9]+/) &&
      strengthCheck.includes("At least 1 special character - !@#$%^&*()")
    ) {
      strength += 1;
    }

    return strength;
  };
  function getStrengthBarColor(strength) {
    switch (strength) {
      case 1:
        return "red";
      case 2:
        return "red";
      case 3:
        return "blue";
      case 4:
        return "blue";
      case 5:
        return "green";
      default:
        return "grey";
    }
  }

  const strengthlength = () => {
    const strengthCheck = JSON.parse(localStorage.getItem("updatedlist"));
    if (strengthCheck === null || strengthCheck.length === 0) {
      let strengthlist = 0;

      return strengthlist;
    } else {
      let strengthlist = strengthCheck.length;

      return strengthlist;
    }
  };

  const strength = calculatePasswordStrength();

  const strengthBarColor = getStrengthBarColor(strength);
  const length = strengthlength();

  const strengthBarStyle = {
    width: `${(strength / length) * 100}%`,
    backgroundColor: strengthBarColor,
    filter: strength > 0 ? `drop-shadow(0 0 5px ${strengthBarColor})` : "none",
  };

  const strengthpercent = strengthBarStyle.width;
  localStorage.setItem("strengthpercent", JSON.stringify(strengthpercent));

  const strengthText = getstrengthText(strength);
  function getstrengthText(strength) {
    switch (strength) {
      case 1:
        return "Easy";
      case 2:
        return "Easy";
      case 3:
        return "Medium";
      case 4:
        return "Medium";
      case 5:
        return "Hard";
      default:
        return "";
    }
  }
  const strengthTextStyle = {
    color: strengthBarColor,
  };

  const buttonopen = calculatebuttonopen(strengthpercent);
  function calculatebuttonopen(strengthpercent) {
    if (
      strengthpercent === "100%" &&
      password !== "" &&
      password.trim().length > 0 &&
      enteredEmail !== "" &&
      enteredEmail.includes("@") &&
      enteredEmail.trim().length > 0
    ) {
      return "true";
    }
  }
  localStorage.setItem("buttonopen", JSON.stringify(buttonopen));

  return (
    <div>
      {errormodal === "true" && <ErrorModal onConfirm={errorHandler} />}
      <div className="new-expense">
        <button onClick={openSettings}>CLICK FOR SETTINGS</button>
      </div>
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="email">Email</label>

          {list === null ||
          list.length === 0 ||
          list === "" ||
          error === "true" ? (
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={enteredEmail}
              style={styles.disabledinput}
              disabled
              autoComplete="email"
              onChange={clearemail}
            />
          ) : (
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={enteredEmail}
              autoComplete="email"
              onChange={clearemail}
            />
          )}

          <label htmlFor="password">Password</label>
          {list === null ||
          list.length === 0 ||
          list === "" ||
          error === "true" ? (
            <input
              id="password"
              type="password"
              className=""
              value={password}
              style={styles.disabledinput}
              disabled
              placeholder="Enter Password"
              onChange={clearpassword}
            />
          ) : (
            <input
              id="password"
              type="password"
              className=""
              value={password}
              placeholder="Enter Password"
              onChange={clearpassword}
            />
          )}

          <div style={{ margin: "0 auto" }}>
            <div className="passwordStrengthMeter">
              <div className="passwordStrengthContainer">
                <div className="strengthBar" style={strengthBarStyle}></div>
              </div>
              <div className="text-right text-xl" style={strengthTextStyle}>
                {strengthText}
              </div>
            </div>
          </div>

          {buttonopen === "true" ? (
            <button type="submit" className="" style={styles.enabledButton}>
              Add User
            </button>
          ) : (
            <button
              type="submit"
              className=""
              style={styles.disabledButton}
              disabled
            >
              Add User
            </button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
const styles = {
  disabledButton: {
    backgroundColor: "gray",
    color: "white",
    cursor: "not-allowed",
    padding: "0.25rem 1rem",
    font: "inherit",
    borderRadius: "8px",
  },

  enabledButton: {
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    padding: "0.25rem 1rem",
    borderRadius: "8px",
    font: "inherit",
  },
  disabledinput: {
    cursor: "not-allowed",
  },
};
