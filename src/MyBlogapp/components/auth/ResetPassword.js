import React, { useEffect } from "react";
import "./ForgetReset.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { resetPassword } from "../../features/auth/authSlice";
export const ResetPassword = () => {
//   const param = useParams();
//   const { accessToken, id } = param;
  const dispatch = useDispatch();

  const resetstate = useSelector((state) => state.user);
  // console.log(resetstate);

  const { error, message } = resetstate;
  // console.log(error, message);

//   const res = localStorage.getItem("user");
//   const user = JSON.parse(res);
//   console.log(user);

//   const token = localStorage.getItem("accessToken");
//   console.log(token);

  useEffect(() => {
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      // navigate("/")
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [message, error]);

  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    newPassword: yup.string().required("Please enter your new password"),
    confirmPassword: yup
      .string()
      .required("Please enter your confirm password"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    let obj = {
      ...values,
    //   id: id,
    //   token: token,
    };
    dispatch(resetPassword(obj));
  };

  return (
    <>
      <ToastContainer />
      <div className="resetPass-container">
        <div className="reset-password">
          <h2 className="reset-h2">Reset Password</h2>

          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                type="password"
                name="newPassword"
                className="reset-input"
                placeholder="&#x2709; Enter your new password"
              />
              <br />
              <ErrorMessage name="newPassword"></ErrorMessage>
              <Field
                type="password"
                name="confirmPassword"
                className="reset-input"
                placeholder="&#x2709; Enter confirm password"
              />
              <br />
              <ErrorMessage name="confirmPassword"></ErrorMessage>

              <button className="reset-btn">Reset</button>
            </Form>
          </Formik>
        </div>
        </div>
    
    </>
  );
};
