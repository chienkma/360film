import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";

Register.propTypes = {};

function Register(props) {
  const handleSubmit = (values) => {
    console.log("New value", values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
