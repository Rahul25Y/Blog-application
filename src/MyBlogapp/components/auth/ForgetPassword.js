import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import "./ForgetReset.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { forgetPassword } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetDData = useSelector((state) => state.user);
  const { error, forget_message } = forgetDData;

  const res = localStorage.getItem("user");
  const user = JSON.parse(res);
  console.log(user);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  useEffect(() => {
    if (forget_message) {
      toast.success(forget_message, { position: toast.POSITION.TOP_CENTER });
      navigate("/");
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [forget_message, error]);

  const initialState = {
    userEmail: "",
  };

  const validationSchema = yup.object().shape({
    userEmail: yup.string().required().email("Please enter your email"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    dispatch(forgetPassword(values));
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <div className="forget-container">
        <h2 className="forget-h2">Forget Password</h2>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="text"
              name="userEmail"
              className="forget-input"
              placeholder="&#x2709; Enter email"
            />
            <span className="danger-message">
              <ErrorMessage name="userEmail"></ErrorMessage>
            </span>
            <br />
            <button className="forget-btn" type="submit">
              <Link to={`/user/reset-password/${user._id}/${token}`}>
                Reset
              </Link>
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
