import React from "react";
import RegisterForm from "../RegisterForm";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
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
  const handleSubmitEmail = async (values) => {
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
  const handleFb = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User Infor:", user);
        set(ref(db, "users/" + user.uid), {
          username: username,
          email: email,
        });
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "You have already signed up with a different auth provider for that email."
          );
        } else {
          console.error(error);
        }
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  const handleGg = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log("User Infor:", user);
        set(ref(db, "users/" + user.uid), {
          username: username,
          email: email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmitEmail} />
      <Typography>Or Sign In by</Typography>
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button onClick={handleFb}>FaceBook</Button>
        <Button onClick={handleGg}>Google</Button>
      </ButtonGroup>
    </div>
  );
}

export default Register;
