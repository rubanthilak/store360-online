import React from "react";
import TextField from "@/components/input/TextField";
import BaseButton from "@/components/button/BaseButton";
import Card from "@/components/common/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "@/helper/inputValidator";

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
      className="container mx-auto flex items-center justify-center h-screen"
      style={{ minHeight: 600 + "px" }}
    >
      <form>
        <Card className="flex flex-col gap-y-4" style={{ width: 400 + "px" }}>
          <h1 className="font-bold text-2xl mb-1">Welcome Back !</h1>
          {errorState && <p className="text-sm text-danger">{errorState}</p>}
          <TextField
            placeholder="Email"
            value={email}
            onChange={emailHandler}
            type="email"
            error={errorState}
          />
          <TextField
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
            type="password"
            error={errorState}
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
