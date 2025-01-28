import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Protected_route = (props) => {
  const {Component} = props;
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user");
    if(!user) {
      navigate("/")
    }
  })
  return (
    <div>
      <Component/>
    </div>
  )
}
