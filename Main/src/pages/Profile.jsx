import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    // const validPassword = enteredPassword.test(
    //   // Minimum eight characters, at least one letter and one number
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
    // );
    if (enteredEmail !== "" && enteredPassword !== "") {
      // UNFINISHED CODE || DEBUGGING
      await fetch("https://apis.ssdevelopers.xyz/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail.trim(),
          pass: enteredPassword,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.message === "you have successfully logged in") {
            dispatch({ type: "LOGIN" });
          }
        });
      ////////////////////////////
    } else {
    }
  };

  const emailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordInputHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  useEffect(() => {
    if (enteredEmail !== "" && enteredPassword !== "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [enteredEmail, enteredPassword]);

  return (
    <React.Fragment>
      {!isLoggedIn && (
        <div className="login">
          <motion.section
            className="login-con"
            animate={
              isLoggedIn
                ? { opacity: 0, x: "-60%", y: "-50%" }
                : { opacity: 1, x: "-50%", y: "-50%" }
            }
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <div className="login-text">
              <h1>Log In to SS Account</h1>
              <p>To unlock more features for System13</p>
            </div>
            <form className="login-form" onSubmit={loginSubmitHandler}>
              <input
                type="email"
                value={enteredEmail}
                onChange={emailInputHandler}
                placeholder="email"
              />
              <input
                type="password"
                value={enteredPassword}
                placeholder="password"
                onChange={passwordInputHandler}
              />
              <NavLink
                to="/signup"
                className="u-remove-a-eff login-form__signup"
              >
                Don't have an account?
              </NavLink>
              <motion.button
                type="submit"
                className={`${
                  canSubmit ? "login-form__submit" : "login-form__cantSubmit"
                }`}
                disabled={!canSubmit}
              >
                &raquo;
              </motion.button>
            </form>
          </motion.section>
        </div>
      )}
      {isLoggedIn && (
        <section className="account">
          <div className="account__profile">
            <div className="account__profile-con">
              <img
                src="https://yt3.ggpht.com/ytc/AKedOLQnp52grHdSYHky8B9cw3EqZxTX7kK8grKXmbXY8A=s176-c-k-c0x00ffffff-no-rj"
                alt="User"
              />
              <div className="account__profile--text">
                <h1>Jirat Chutrakul's</h1>
                <p>Administrator Account</p>
              </div>
            </div>
            <button className="btn">Edit Information</button>
          </div>
          <div className="account__addPlayer">
            <h2>Add player to System13</h2>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Profile;
