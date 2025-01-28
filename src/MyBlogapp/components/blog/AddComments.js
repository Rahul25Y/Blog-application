import React, { useEffect } from "react";
import "./AddComments.css";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, comments } from "../../features/comments/commentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddComments = () => {
  const navigate = useNavigate();
  let param = useParams();
  const { id } = param;
  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const commentData = useSelector((state) => state.comment);
  console.log("comment", commentData);
  const { comment_msg, error, loading } = commentData;

  useEffect(() => {
    if (comment_msg) {
      toast.success(comment_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate(`/blogdetails/${id}`);
      }, 1000);
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [comment_msg, error]);

  const initialState = {
    comment: "",
  };

  const validationSchema = yup.object().shape({
    comment: yup.string().required("Please enter comment"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    let obj = {
      ...values,
      blogId: id,
      userId: user._id,
    };
    dispatch(comments(obj));
  };

  return (
    <>
      <ToastContainer />
      <div className="AddComment-container">
        <h2 className="comment-h2">Add Comments</h2>

        {/* Link to navigate back to the BlogDetails page */}
        <Link to={`/blogdetails/${id}`} className="back-to-blogdetails">
          &larr; Back to Blog Details
        </Link>

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              type="text"
              name="comment"
              className="comment-input"
              placeholder="&#x2709; Enter comment"
            />

            <span className="danger-message">
              <ErrorMessage name="comment"></ErrorMessage>
            </span>
            <br />
            <button className="comment-btn" type="submit">
              Add Comment
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
