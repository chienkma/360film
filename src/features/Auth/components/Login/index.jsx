import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";
Login.propTypes = {};
const handleSubmit = (values) => {
  try {
    const email = values.email;
    const password = values.password;
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
      }
    );
    enqueueSnackbar("Register secessfully", { variant: "success" });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    enqueueSnackbar("Register Fail", { variant: "error" });
  }
};
function Login(props) {
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
