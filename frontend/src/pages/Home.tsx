import React from "react";
import { Redirect } from "react-router-dom";
import Devices from "../components/Devices";
import { getAccessToken, getDefaultDevice } from "../utils/utils";

const Home = () => {
  const defaultDevice: string | null = getDefaultDevice();

  const accessToken = getAccessToken();

  if (defaultDevice !== null) {
    return <Redirect to={`/control/${defaultDevice}`} />;
  }

  if (accessToken === null) {
    return <Redirect to={"/setup"} />;
  }

  return (
    <div>
      <Devices />
    </div>
  );
};

export default Home;
