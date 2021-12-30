function validateEmail(email) {
  let hasError, error;
  let isValid = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (email.trim() === "") {
    hasError = true
    error = "Email cannot be Empty."
  } 
  else if(isValid === null){
    hasError = true
    error = "Invalid Email Address, Please confirm once again."
  }
  else{
    hasError = false
    error = ""
  }
  return { hasError, error }
}

function validatePassword(password){
  let hasError, error;
  let isValid = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  if (password.trim() === "") {
    hasError = true
    error = "Password cannot be Empty."
  } 
  else if(isValid === null){
    hasError = true
    error = "Password must contains minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  }
  else{
    hasError = false
    error = ""
  }
  return { hasError, error }
}

function validateRepeatPassword(repeatPassword, password){
  let hasError, error;
  let isValid = repeatPassword.match(password);
  if (repeatPassword.trim() === "") {
    hasError = true
    error = "Confirm Password cannot be Empty."
  } 
  else if(isValid === null){
    hasError = true
    error = "Password do not match, Please confirm once again."
  }
  else{
    hasError = false
    error = ""
  }
  return { hasError, error }
}

function validatePhone(phone){
  let hasError, error;
  let isValid = phone.match(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  if (phone.trim() === "") {
    hasError = true
    error = "Phone cannot be Empty."
  } 
  else if(isValid === null){
    hasError = true
    error = "Invalid Phone Address, Please confirm once again."
  }
  else{
    hasError = false
    error = ""
  }
  return { hasError, error }
}

function validateUserName(userName){
  let hasError, error;
  if (userName.trim() === "") {
    hasError = true
    error = "Name cannot be Empty."
  } else if (!/^[a-zA-Z ]+$/.test(userName)) {
    hasError = true
    error = "Invalid Name, Avoid Special characters."
  } else {
    hasError = false
    error = ""
  }
  return { hasError, error }
}

function validateInput (fieldName, value, ...params) {
  let res = { hasError : false, error : "" };
  switch (fieldName) {
    case "userName":
      res = validateUserName(value);
      break;
    case "email":
      res = validateEmail(value);
      break;
    case "phone":
      res = validatePhone(value);
      break;
    case "password":
      res = validatePassword(value);
      break;
    case "repeat_password":
      res = validateRepeatPassword(value, ...params);
      break;
    default:
      break
  }
  return res;
}

export { validateInput,validatePassword, validateEmail} ;
