import React from "react";
import TextField from "@/components/input/TextField";
import BaseButton from "@/components/button";
import Card from "@/components/common/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "@/helper/inputValidator";
import Logo from "@/components/common/Logo";

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
    setErrorState(null);
    const { hasError } = validateEmail(email);
    if (hasError || password.trim() === "") {
      setErrorState("Invalid Credentials, Please confirm once again.");
      return false;
    }
    setErrorState(null);
    return true;
  }

  /**
   * Send Http POST Request to REST API for authentication.
   */
  async function sendLoginRequest(e) {
    e.preventDefault()
    if (validateCredentials()) {
      //TODO:send http req to backend
    } 
  }

  return (
    <section
      className="container flex-col mx-auto flex items-center justify-center app-height"
    >
      <form className="w-full sm:w-96">
        <Card className="flex flex-col gap-y-5 shadow-none sm:shadow-lg">
          <p className="font-bold text-3xl">Welcome Back!</p>
          {errorState && <p className="text-sm text-danger">{errorState}</p>}
          <TextField
            placeholder="Email"
            value={email}
            onChange={emailHandler}
            type="email"
            error={errorState}
            autoComplete="email"
          />
          <TextField
          placeholder="Password"
          value={password}
          onChange={passwordHandler}
          type="password"
          error={errorState}
          autoComplete="current-password"
          />
          <Link
            to="/forgot-password"
            className="inline text-sm text-secondary font-medium"
          >
            Forgot Password ?
          </Link>
          <BaseButton label="LOGIN" onClick={sendLoginRequest} />
          <p className="text-sm text-primary-800 font-medium">
            New to Our Online Store ?{" "}
            <span className="text-secondary">
              <Link to="/signup">Register</Link>
            </span>
          </p>
        </Card>
      </form>
    </section>
  );
}

export default Login;
