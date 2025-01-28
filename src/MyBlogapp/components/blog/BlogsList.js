import React, { useEffect } from "react";
import "./BlogList.css";
import { Navbar } from "../../navbar/Navbar";
import { Footer } from "../../navbar/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/blog/blogSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import './BlogList.css'

export const BlogsList = () => {
  const blog = useSelector((state) => state.blog);
  const { blog_data } = blog;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const res = localStorage.getItem("user");
  const user = JSON.parse(res);

  useEffect(() => {
    dispatch(getBlogs());
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Smooth animation
    });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="BlAddBtn">
        <h3 className="Blog-h3">MY Blog</h3>
        <button className="addBlBtn">
          <Link to="/createBlog">Add Blog</Link>
        </button>
      </div>

      <div className="blog-image-content">
        {blog_data &&
          blog_data.map(({ _id, blogPic, title, description, createdAt }) => (
            <div
              className="blog-post-container"
              data-aos="fade-up"
              key={_id}
            >
              <Link to={`/blogdetails/${_id}`}>
                <img
                  src={`http://localhost:7000${blogPic}`}
                  className="post-image"
                  alt={`Blog titled ${title}`}
                />
                <div className="blog-post-content">
                  <div className="blog-Name-date">
                    <h2>{title}</h2>
                    <p className="blog-date">{createdAt.slice(0, 10)}</p>
                  </div>
                  <p className="post-descripton">{description}</p>
                </div>
              </Link>
              <div className="blog-commLike">
                {user?.userName ? <h5>{user?.userName}</h5> : navigate("/")}
                <div className="Comment-like-icon">
                  <FontAwesomeIcon
                    icon={faCommentMedical}
                    className="comments"
                    style={{ color: "#0d0f11" }}
                  />
                  <FontAwesomeIcon
                    className="blog-like"
                    icon={faThumbsUp}
                    style={{ color: "#0c1017" }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <br/><br/>
      <Footer />
    </>
  );
};
