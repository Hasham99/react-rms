import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (login == `true`) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoute;
