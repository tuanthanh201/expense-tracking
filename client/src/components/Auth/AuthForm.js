import { useContext, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";

import Notification from "../UI/Notification";
import AuthContext from "../../store/auth-context";
import { uiActions } from "../../store/ui-slice";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const notification = useSelector((state) => state.ui.notification);

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const disableNotification = () => {
    if (notification) {
      dispatch(uiActions.showNotification(null));
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);

    setIsLoading(true);

    let url;
    if (!isLogin) {
      url = "/api/users";
    } else {
      url = "/api/auth";
    }

    try {
      const response = await axios.post(url, body, config);
      const token = response.data.token;
      const expirationTime = new Date(new Date().getTime() + 3600000);
      authCtx.login(token, expirationTime);
      if (notification) {
        dispatch(uiActions.showNotification(null));
      }
      history.replace("/");
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.response.data.msg,
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              onChange={disableNotification}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              onChange={disableNotification}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
