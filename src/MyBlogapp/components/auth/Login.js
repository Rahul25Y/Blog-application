import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { SignInUser, clearState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/");
      }, 500);
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate("/blogList/");
      }, 1000);
    }
  }, [error, message]);
  const initialState = {
    userEmail: "",
    userPassword: "",
  };

  const validationSchema = yup.object().shape({
    userEmail: yup.string().email().required("Please enter your email"),
    userPassword: yup
      .string()
      .required("Please enter your password")
      .min(8, "password must have at least 8 characters"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    const result = await dispatch(SignInUser(values));
  };
  return (
    <>
      <ToastContainer />
      <div className="login-container">
      <div className="login-com-form">
        <h2 className="login-h2">Login</h2>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <Field
              className="login-input"
              type="text"
              name="userEmail"
              placeholder="&#x2709; Email"
            />
            <br/>
            <span className="danger-message">
              <ErrorMessage name="userEmail"></ErrorMessage>
            </span>
            <br/>
            <Field
              className="login-input"
              type="password"
              name="userPassword"
              placeholder="&#128274; Password"
            />
            <br />
            <span className="danger-message">
              <ErrorMessage name="userPassword"></ErrorMessage>
            </span>
            <br />

            <p className="login-p1">
              <Link to="forgetpassword">Forget Password? </Link>
            </p>
            <button className="login-btn" type="submit">
             Login
            </button>
          </Form>
        </Formik>
        <hr />
        <p className="login-p2">I don't have an account on Blog Application</p>
        <Link className="login-register" to="signup">
          Register Now
        </Link>
        </div>
      </div>
    </>
  );
};
