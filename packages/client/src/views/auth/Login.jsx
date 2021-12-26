import React from "react";
import TextField from "../../components/input/TextField";
import BaseButton from "../../components/button/BaseButton";
import Card from "../../components/common/Card";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorState, setErrorState] = useState(null);

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  /**
   * Validates email and password.
   * @returns Boolean
   */
  function validateCredentials() {
    let _email = email.trim();
    let _password = password.trim();
    if (
      _email === "" ||
      _email === null ||
      _email === undefined ||
      _password === "" ||
      _password === null ||
      _password === undefined
    ) {
      setErrorState("Invalid Credentials, Please fill all the fields")
      return false;
    }
    setErrorState(null);
    return true;
  }

  /**
   * Send Http POST Request to REST API for authentication.
   */
  async function sendLoginRequest() {
    if (validateCredentials()) {
      
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
        {errorState && <p className="text-sm text-red-500">{errorState}</p>}
        <TextField
          placeHolder="Email"
          value={email}
          onChange={emailHandler}
          type="email"
          error={errorState}
        />
        <TextField
          placeHolder="Password"
          value={password}
          onChange={passwordHandler}
          type="password"
          error={errorState}
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
