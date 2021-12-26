import React from "react";
import TextField from "../../components/input/TextField";
import BaseButton from "../../components/button/BaseButton";
import Card from "../../components/common/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../helper/api";

const initialState = {
  userName: "",
  email: "",
  phone: "",
  password: "",
  repeat_password: "",
};

function Signup() {
  const [formState, setFormState] = useState(initialState);
  const [errorState, setErrorState] = useState(null);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  function validateFormInput() {
    let _userName = formState.userName.trim();
    let _email = formState.email.trim();
    let _phone = formState.phone.trim();
    let _password = formState.password.trim();
    let _repeat_password = formState.repeat_password.trim();
    if (
      _userName === "" ||
      _email === "" ||
      _password === "" ||
      _phone === "" ||
      _repeat_password === "" ||
      _userName === null ||
      _email === null ||
      _password === null ||
      _phone === null ||
      _repeat_password === null ||
      _userName === undefined ||
      _email === undefined ||
      _password === undefined ||
      _phone === undefined ||
      _repeat_password === undefined
    ) {
      setErrorState("Invalid Input, Please fill all the fields.");
      return false;
    } else if (_password !== _repeat_password) {
      setErrorState("Passwords do not match, Please confirm once again.");
      return false;
    }
    setErrorState(null);
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormInput()) {
      const res = await api.signup(formState);
    }
  };

  return (
    <section className="container mx-auto flex items-center justify-center h-screen">
      <Card className="flex flex-col gap-y-4" style={{ width: 400 + "px" }}>
        <h1 className="font-bold text-2xl mb-1">Hey, Welcome</h1>
        {errorState && <p className="text-sm text-red-500">{errorState}</p>}
        <TextField
          placeholder="Name"
          name="userName"
          value={formState.userName}
          onChange={handleChange}
          error = {errorState && formState.userName.trim() === ""}
        />
        <TextField
          placeholder="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          error = {errorState && formState.email.trim() === ""}
        />
        <TextField
          placeholder="Phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          error = {errorState && formState.phone.trim() === ""}
        />
        <TextField
          placeholder="Password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          type="password"
          error = {errorState && formState.password.trim() === ""}
        />
        <TextField
          placeholder="Confirm Password"
          name="repeat_password"
          value={formState.repeat_password}
          onChange={handleChange}
          type="password"
          error = {errorState && (formState.repeat_password.trim() === "" || formState.password.trim() !== formState.repeat_password.trim())}
        />
        <p className="text-sm text-gray-500 font-medium">
          By continuing, I agree to the{" "}
          <span className="text-blue-600">
            <Link to="/">Terms of Use</Link>
          </span>{" "}
          &{" "}
          <span className="text-blue-600">
            <Link to="/">Privacy Policy</Link>
          </span>
        </p>
        <BaseButton
          label="SIGNUP"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        />
      </Card>
    </section>
  );
}

export default Signup;
