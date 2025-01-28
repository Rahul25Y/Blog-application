import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser, clearState } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Signup.css';

export const Signup = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const { error, message } = data;
  const [pic, setPic] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      dispatch(clearState());
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      dispatch(clearState());
    }
  }, [error, message, dispatch]);

  const validationSchema = yup.object().shape({
    userName: yup.string().required("Name is required"),
    userEmail: yup.string().email("Invalid email").required("Email is required"),
    userPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    userPhone: yup.string().required("Phone number is required"),
    userCity: yup.string().required("City is required"),
    userState: yup.string().required("State is required"),
  });

  const initialValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userCity: "",
    userState: "",
  };

  const handleSubmit = (values) => {
    const formData = { ...values, profilePic: pic };
    dispatch(SignUpUser(formData));
  };

  return (
    <div className="signup-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-form-container">
          <h2>Signup Form</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="auth-form">
              <Field type="text" name="userName" className="auth-input" placeholder="Full Name" />
              <ErrorMessage name="userName" component="span" className="error-message" />

              <Field type="email" name="userEmail" className="auth-input" placeholder="Email" />
              <ErrorMessage name="userEmail" component="span" className="error-message" />

              <Field type="password" name="userPassword" className="auth-input" placeholder="Password" />
              <ErrorMessage name="userPassword" component="span" className="error-message" />

              <Field type="text" name="userPhone" className="auth-input" placeholder="Phone" />
              <ErrorMessage name="userPhone" component="span" className="error-message" />

              <Field type="text" name="userCity" className="auth-input" placeholder="City" />
              <ErrorMessage name="userCity" component="span" className="error-message" />

              <Field type="text" name="userState" className="auth-input" placeholder="State" />
              <ErrorMessage name="userState" component="span" className="error-message" />

              <input type="file" onChange={(e) => setPic(e.target.files[0])} className="auth-input" />
              <button type="submit" className="auth-btn">Signup</button>
            </Form>
          </Formik>
          <p className="auth-toggle">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
