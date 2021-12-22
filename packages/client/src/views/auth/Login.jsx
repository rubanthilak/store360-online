import React from "react";
import TextField from "../../components/input/TextField";
import BaseButton from "../../components/button/BaseButton";
import Card from "../../components/common/Card";
import { Link, useHistory  } from "react-router-dom";
import { useState } from "react";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const history = useHistory();

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  /**
   * Validates username and password.
   * @returns Boolean
   */
  function validateCredentials() {
    let _username = username.trim();
    let _password = password.trim();
    if (
      _username === "" ||
      _username === null ||
      _username === undefined ||
      _password === "" ||
      _password === null ||
      _password === undefined
    ) {
      return false;
    }
    return true;
  }

  /**
   * Send Http POST Request to REST API for authentication.
   */
  async function sendLoginRequest() {
    if (validateCredentials) {
      const payload = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
      try {
        const response = await fetch(
          import.meta.env.VITE_APP_REST_API_BASE_URL + "/login",
          payload
        );
        if (response.status === 201) {
          const token = await response.json();
          localStorage.setItem("auth-token", token);
          history.push("/");
        } else {
          //Not Authenticated message here
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      //Not Valid message here
    }
  }

  return (
    <section
      className="container mx-auto flex items-center justify-center h-screen"
      style={{ minHeight: 600 + "px" }}
    >
      <Card className="flex flex-col gap-y-4" style={{ width: 400 + "px" }}>
        <h1 className="font-bold text-2xl mb-1">Welcome Back !</h1>
        <TextField
          placeHolder="Username"
          value={username}
          onChange={usernameHandler}
        />
        <TextField
          placeHolder="Password"
          value={password}
          onChange={passwordHandler}
        />
        <Link to="/forgot-password" className="inline text-sm text-blue-600 font-medium">
          Forgot Password ?
        </Link>
        <BaseButton label="LOGIN" onClick={sendLoginRequest} />
        <p className="text-sm text-gray-500 font-medium">
          New to Our Online Store ?{" "}
          <span className="text-blue-600">
            <Link to="/signup">Register</Link>
          </span>
        </p>
      </Card>
    </section>
  );
}

export default Login;
