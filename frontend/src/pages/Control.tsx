import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDeviceControls, sendCommand } from "../api/api";
import { netflixGet, netflixPost } from "../api/netflix-control.api";
import { DeviceCommand } from "../api/types";
import { CardIcon, CardTitle, CardWrapper, Wrapper } from "../components/Crad";
import Header from "../components/Header";
import { getDefaultDevice } from "../utils/utils";

const ControlWrapper = styled.div`
  display: block;
`;

interface RouteParams {
  deviceId: string;
}

const Spacer: React.FC = () => {
  if (getDefaultDevice() !== null) return null;
  return <div style={{ display: "block", height: "5em", width: "100%" }}></div>;
};

const Control: React.FC = () => {
  const params = useParams<RouteParams>();

  const deviceId = params.deviceId;
  const [deviceCommands, setDeviceCommands] = useState<DeviceCommand[]>([]);

  useEffect(() => {
    getDeviceControls(deviceId).then((r) =>
      setDeviceCommands(r as DeviceCommand[])
    );
  }, []);

  const deviceCommanCards = deviceCommands.map((command) => {
    return (
      <CardWrapper
        onClick={() => {
          sendCommand(deviceId, command.command, command.argument);
          if (command.command === "netflix") {
            netflixGet(`/next/${command.argument}`);
          } else if (command.command === "tv") {
            netflixPost(
              `/url`,
              {
                url: "https://berit-tv.jakoblj.xyz/mac",
                userid: "a116a760-f8fc-475e-8c8e-0534d85252b5",
              },
              "a116a760-f8fc-475e-8c8e-0534d85252b5"
            );
          }
        }}
      >
        <CardIcon src={`/icons/controls/${command.image}`} />
        <CardTitle>{command.description}</CardTitle>
      </CardWrapper>
    );
  });

  return (
    <ControlWrapper>
      <Header deviceId={deviceId} />
      <Spacer />
      <Wrapper>{deviceCommanCards}</Wrapper>
    </ControlWrapper>
  );
};

export default Control;
