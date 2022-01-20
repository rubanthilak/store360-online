import React from "react";
import TextField from "@/components/input/TextField";
import BaseButton from "@/components/button/BaseButton";
import Card from "@/components/common/Card";
import { useState } from "react";
import {validatePassword} from "@/helper/inputValidator";

//TODO: Need to add Validator and Funtionality

function ResetPassword() {
  let [password, setPassword] = useState("");
  let [repeatPassword, setRepeatPassword] = useState("");
  let [errorState, setErrorState] = useState(null);

  function handleChange(e) {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setRepeatPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    setErrorState(null);
    e.preventDefault();
    let {hasError , error} = validatePassword(password)
    if(hasError){
        setErrorState(error);
    }
    else if(password !== repeatPassword){
        setErrorState("Password do not match, Please check once again");
    }
    else{
        //TODO:send http to backend
    }
  }

  return (
    <section className="container mx-auto flex items-center justify-center h-screen">
      <form>
        <Card className="flex flex-col gap-y-4" style={{ width: 400 + "px" }}>
          <h1 className="font-bold text-2xl mb-1">Password Reset 🔐</h1>
          {errorState && <p className="text-sm text-danger">{errorState}</p>}
          <TextField
            placeholder="New Password"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            autoComplete="on"
            error={errorState}
          />
          <TextField
            placeholder="Confirm NewPassword"
            name="repeat_password"
            value={repeatPassword}
            onChange={handleChange}
            type="password"
            autoComplete="on"
            error={errorState}
          />
          <p className="text-sm text-primary-600 font-medium">
            Your new password must be different from the password used before.
          </p>
          <BaseButton onClick={handleSubmit} label="RESET NOW" />
        </Card>
      </form>
    </section>
  );
}

export default ResetPassword;
