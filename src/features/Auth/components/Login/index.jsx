import LoginForm from "../LoginForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { auth, app } from "../../../../firebase/config";
import { useSnackbar } from "notistack";
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
  return (
    <div>
      <LoginForm onSubmit={handleSubmitLogIn} />
    </div>
  );
}

export default Login;
