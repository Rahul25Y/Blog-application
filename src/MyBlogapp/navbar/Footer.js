import React from 'react'
import './Footer.css'
export const Footer = () => {
  return (
    <>
          <div className="footer-of-blog">
        <div>
          <h2 style={{ fontWeight: "bolder", fontSize: "35px" }}>Logo</h2>
          <br />
          <p className="p-logo-information">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
            distinctio cum, tenetur eius assumenda modi vitae voluptates.
          </p>
        </div>
        <ul>
          <h3>Company Info</h3>
          <br />

          <li>About Us</li>
          <li>Careers</li>
          <li>FAQ</li>
          <li>Feedback</li>
        </ul>
        <ul>
          <h3>Information</h3>
          <br />

          <li>Customer Service</li>
          <li>World Return Policy</li>
          <li>Product Warranty</li>
          <li>Product Retail</li>
        </ul>
        <ul>
          <h3>Customer Care</h3>
          <br />
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Whatapp</li>
          <li>Everything Better</li>
        </ul>
      </div>
    </>
  )
}
