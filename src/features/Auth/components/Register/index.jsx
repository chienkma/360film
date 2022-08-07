import React from "react";
import RegisterForm from "../RegisterForm";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, app } from "../../../../firebase/config";
import { getDatabase, ref, set } from "firebase/database";
import { Button, Typography, ButtonGroup } from "@material-ui/core";
Register.prototype = {
  closeDialog: PropTypes.func,
};
function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  // Register by email
  const db = getDatabase(app);
  const handleSubmit = async (values) => {
    try {
      const username = values.fullName;
      const email = values.email;
      const password = values.password;
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          set(ref(db, "users/" + user.uid), {
            username: username,
            email: email,
          });
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
      <Typography>Or Sign In by</Typography>
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button>FaceBook</Button>
        <Button>Google</Button>
      </ButtonGroup>
    </div>
  );
}

export default Register;
