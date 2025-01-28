import React, { useEffect } from "react";
import { Navbar } from "../../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBlogDetails } from "../../features/blog/blogSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./BlogDetails.css";
import { Footer } from "../../navbar/Footer";

export const BlogDetails = () => {
  // Access the Redux state for blog details and comments
  const { blog_Details, comments } = useSelector((state) => state.blog);
  
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the blog ID from the route parameters

  useEffect(() => {
    // Fetch blog details on component mount or when ID changes
    dispatch(getBlogDetails(id));
  }, [id, dispatch]);

  return (
    <>
      <Navbar />

      <div className="blogDetail">
        <div className="blogCard">
          <img
            className="blogdetail-image"
            src={`http://localhost:7000${blog_Details?.blogPic}`}
            alt={blog_Details?.title || "Blog Image"}
          />
          <h1 className="blogDetail-h1">{blog_Details?.title}</h1>
          <p className="blogDetail-h5">{blog_Details?.description}</p>
          <div className="Commentdetail-like-icon">
            <Link to={`/addcomment/${id}`} className="add-comment-link">
              <span className="ct">Comment</span>
              <FontAwesomeIcon
                icon={faCommentMedical}
                className="commentdetail"
              />
            </Link>
            <FontAwesomeIcon className="blogdetail-like" icon={faThumbsUp} />
          </div>
        </div>
      </div>

      <div className="comment-section">
        {comments?.length > 0 ? (
          comments.map((comment) => {
            const { profilePic } = comment.userId || {};
            const imageUrl = profilePic?.split("\\uploads\\")[1];
            return (
              <div className="commentCard" key={comment._id}>
                <img
                  className="comment-image"
                  src={`http://localhost:7000/uploads/${imageUrl}`}
                  alt={`${comment.userId?.userName || "User"} Profile`}
                />
                <FontAwesomeIcon
                  icon={faCommentMedical}
                  className="commenticon"
                  style={{ color: "beige" }}
                />
                <h2>{comment.userId?.userName}</h2>
                <h1>{comment.comment}</h1>
              </div>
            );
          })
        ) : (
          <p className="no-comments-message">No comments yet. Be the first to comment!</p>
        )}
      </div>

      <Footer />
    </>
  );
};
