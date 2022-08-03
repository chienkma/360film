import React from "react";
import RegisterForm from "../RegisterForm";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/config";
Register.prototype = {
  closeDialog: PropTypes.func,
};
function Register(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values) => {
    try {
      const email = values.email;
      const password = values.password;
      signInWithEmailAndPassword(auth, email, password).then(
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
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
