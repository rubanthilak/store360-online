import React from "react";
import TextField from "@/components/input/TextField";
import BaseButton from "@/components/button/BaseButton";
import Card from "@/components/common/Card";
import { Link } from "react-router-dom";
import { useState, useReducer } from "react";
import { UPDATE_FORM } from "@/const/formActionType";
import { validateInput } from "@/helper/inputValidator";
import HttpRequest from "@/helper/api";
import "./style.scss";

const initialState = {
  userName: { value: "", touched: false, hasError: true, error: "" },
  email: { value: "", touched: false, hasError: true, error: "" },
  phone: { value: "", touched: false, hasError: true, error: "" },
  password: { value: "", touched: false, hasError: true, error: "" },
  repeat_password: { value: "", touched: false, hasError: true, error: "" },
  isFormValid: false,
};

const formsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        // update the state of the particular field,
        // by retaining the state of other fields
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

function Signup() {
  const [formState, dispatch] = useReducer(formsReducer, initialState);
  const [showError, setShowError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault() //prevents the form from submitting

    let isFormValid = true

    for (const name in formState) {
      const item = formState[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value, formState.password.value)
      if (hasError) {
        isFormValid = false
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        })
      }
    }
    if (!isFormValid) {
      setShowError("Please fill all the fields correctly")
    } else {
      try {
        const res = await HttpRequest.signup({
          userName: formState.userName.value,
          email: formState.email.value,
          phone: formState.phone.value,
          password: formState.password.value,
          repeat_password: formState.repeat_password.value
        });
        console.log(res);
        setShowError(res.data.message);
      } catch (error) {
        error = error.toJSON()
        setShowError(error.message);
      }
    }

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(null)
    }, 5000)
  }

  function onFocusOut(e) {
    const { name, value } = e.target;
    const { hasError, error } = validateInput(name, value, formState.password.value);
    let isFormValid = true;
    for (const key in formState) {
      const item = formState[key];
      if (key === name && hasError) {
        isFormValid = false;
        break;
      } else if (key !== name && item.hasError) {
        isFormValid = false;
        break;
      }
    }

    dispatch({
      type: UPDATE_FORM,
      data: { name, value, hasError, error, touched: true, isFormValid },
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const { hasError, error } = validateInput(name, value);
    let isFormValid = true;
    for (const key in formState) {
      const item = formState[key];
      // Check if the current field has error
      if (key === name && hasError) {
        isFormValid = false;
        break;
      } else if (key !== name && item.hasError) {
        // Check if any other field has error
        isFormValid = false;
        break;
      }
    }

    dispatch({
      type: UPDATE_FORM,
      data: { name, value, hasError, error, touched: false, isFormValid },
    });
  }

  return (
    <section className="container mx-auto flex items-center justify-center h-screen">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Card className="flex flex-col wrapper" style={{ width: 400 + "px" }}>
          <h1 className="font-bold text-2xl mb-1">Hey, Welcome</h1>
          {showError && <p  className="text-xs text-danger">{showError}</p>}
          <TextField
            placeholder="Name"
            name="userName"
            value={formState.userName.value}
            onChange={handleChange}
            onBlur={onFocusOut}
            error={formState.userName.hasError && formState.userName.touched}
          />
          {formState.userName.touched && formState.userName.hasError && (
            <div className="text-xs text-danger m-0">
              {formState.userName.error}
            </div>
          )}
          <TextField
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email.value}
            onChange={handleChange}
            onBlur={onFocusOut}
            error={formState.email.hasError && formState.email.touched}
          />
          {formState.email.touched && formState.email.hasError && (
            <div className="text-xs text-danger m-0">
              {formState.email.error}
            </div>
          )}
          <TextField
            placeholder="Phone"
            name="phone"
            value={formState.phone.value}
            onChange={handleChange}
            onBlur={onFocusOut}
            error={formState.phone.hasError && formState.phone.touched}
          />
          {formState.phone.touched && formState.phone.hasError && (
            <div className="text-xs text-danger m-0">
              {formState.phone.error}
            </div>
          )}
          <TextField
            placeholder="Password"
            name="password"
            value={formState.password.value}
            onChange={handleChange}
            onBlur={onFocusOut}
            type="password"
            autoComplete="on"
            error={formState.password.hasError && formState.password.touched}
          />
          {formState.password.touched && formState.password.hasError && (
            <div className="text-xs text-danger m-0">
              {formState.password.error}
            </div>
          )}
          <TextField
            placeholder="Confirm Password"
            name="repeat_password"
            value={formState.repeat_password.value}
            onChange={handleChange}
            onBlur={onFocusOut}
            type="password"
            autoComplete="on"
            error={
              formState.repeat_password.hasError &&
              formState.repeat_password.touched
            }
          />
          {formState.repeat_password.touched &&
            formState.repeat_password.hasError && (
              <div className="text-xs text-danger m-0">
                {formState.repeat_password.error}
              </div>
            )}
          <p className="text-sm text-primary-600 font-medium my-3">
            By continuing, I agree to the{" "}
            <span className="text-secondary">
              <Link to="/">Terms of Use</Link>
            </span>{" "}
            &{" "}
            <span className="text-secondary">
              <Link to="/">Privacy Policy</Link>
            </span>
          </p>
          <BaseButton
            label="SIGNUP"
            type="submit"
          />
        </Card>
      </form>
    </section>
  );
}

export default Signup;
