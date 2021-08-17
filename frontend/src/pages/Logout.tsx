import React from "react";
import { Redirect } from "react-router";

const Logout: React.FC = () => {
  localStorage.clear();

  return <Redirect to={"/"} />;
};

export default Logout;
