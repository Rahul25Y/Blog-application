import React, { useEffect, useState } from "react";
import "./AddBlog.css";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../features/blog/blogSlice";
import { clearState } from "../../features/blog/blogSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
export const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.blog);
  console.log(blogData);
  let { error, blogcreate_msg, loading } = blogData;
  useEffect(() => {
    if (blogcreate_msg) {
      toast.success(blogcreate_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState())
        navigate("/blogList");
      }, 1000);
    }
    else if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState())
      }, 1000);
    }
  }, [blogcreate_msg,error]);

  const [pic, setPic] = useState("");
  const initialState = {
    title: "",
    description: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Please enter valid title"),
    description: yup.string().required("Please enter valid description"),
  });

  function handleSubmit(values) {
    console.log("Values", values);
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = {
      ...values,
      blogPic: pic,
      userId: user._id,
    };
    dispatch(createBlog(obj));
  }

  function addProfilePic(e) {
    setPic(e.target.files[0]);
  }

  return (
    <>
      <ToastContainer/>
      <div className="add-rev-container">
        <div className="add-review">
          <div className="reviewS-star">
            <h1 className="add-rev-h1">Add Blog</h1>
          </div>
          <br />

          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="add-review-form">
              <Field
                className="add-rev-input1"
                type="text"
                name="title"
                placeholder="Enter title"
              />
              <br />
              <span className="danger-message">
                <ErrorMessage name="title"></ErrorMessage>
              </span>
              
              <Field
                className="add-rev-input1"
                type="text"
                name="description"
                placeholder="Description"
              />
              
              <span className="danger-message">
                <ErrorMessage name="description"></ErrorMessage>
              </span>

          

              <input
                type="file"
                name="blogPic"
                onChange={addProfilePic}
              ></input>
              
              <div className="s-button">
              <button className="review-btn" type="submit">
                Save
              </button>
              <Link to={'/blogList/'} className="s-link"><FaArrowLeft/> Back to BlogList</Link>
              </div>
              
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
