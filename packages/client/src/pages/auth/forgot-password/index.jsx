import React from "react";
import TextField from "@/components/input/TextField";
import BaseButton from "@/components/button/BaseButton";
import Card from "@/components/common/Card";
import { useState } from "react";
import {validateEmail} from "@/helper/inputValidator";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorState, setErrorState] = useState(null);

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function sendPasswordResetRequest() {
    setErrorState(null);
    const {hasError, error} = validateEmail(email);
    if(hasError){
      setErrorState(error);
    }
    else{
      //TODO:send http request to backend
    }
  }

  return (
    <section className="container mx-auto flex items-center justify-center h-screen">
      <Card className="flex flex-col gap-y-4" style={{ width: 400 + "px" }}>
        <h1 className="font-bold text-2xl">Forgot Password 😅</h1>
        {errorState && <p className="text-sm text-danger">{errorState}</p>}
        <TextField onChange={emailHandler} placeholder="Enter Email" />
        <p className="text-sm text-primary-600 font-medium">
          Link to reset your password will be sent to this Email address.
        </p>
        <BaseButton onClick={sendPasswordResetRequest} label="CONFIRM EMAIL" />
      </Card>
    </section>
  );
}

export default ForgotPassword;
