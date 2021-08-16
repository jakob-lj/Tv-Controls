import React from "react";
import { Redirect } from "react-router-dom";
import { getAccessToken, getDefaultDevice } from "../utils/utils";

const Home = () => {
  const defaultDevice: string | null = getDefaultDevice();

  const accessToken = getAccessToken();

  if (defaultDevice !== null) {
    return <Redirect to={defaultDevice} />;
  }

  if (accessToken === null) {
    return <Redirect to={"/setup"} />;
  }

  return <div>Home</div>;
};

export default Home;
