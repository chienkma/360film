import { Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useSnackbar } from "notistack";
import { app, auth } from "../../../../firebase/config";
import LoginForm from "../LoginForm";
Login.propTypes = {};

function Login(props) {
  const db = getDatabase(app);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmitLogIn = (values) => {
    try {
      const email = values.email;
      const password = values.password;
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          let lgDay = new Date();
          update(ref(db, "users/" + user.uid), {
            last__lg: lgDay,
          });
          enqueueSnackbar("Sign In secessfully", { variant: "success" });
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      enqueueSnackbar("Sign In Fail", errorMessage, { variant: "error" });
    }
  };
  const handleFb = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User Infor:", user);
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmitLogIn} />
      <Typography>Or Sign In by</Typography>
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button onClick={handleFb}>FaceBook</Button>
        <Button onClick={handleGg}>Google</Button>
      </ButtonGroup>
    </div>
  );
}

export default Login;
