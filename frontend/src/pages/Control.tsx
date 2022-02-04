import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDeviceControls, getJakeboxId, sendCommand } from "../api/api";
import { netflixGet, netflixPost } from "../api/netflix-control.api";
import { DeviceCommand, JakeboxId } from "../api/types";
import {
  CardIcon,
  CardIconWrapper,
  CardIconWrapperWrapper,
  CardTitle,
  CardWrapper,
  Wrapper,
} from "../components/Crad";
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
  const [jakeboxId, setJakeboxId] = useState<JakeboxId | null>(null);

  const _getJakeboxId = (): JakeboxId => {
    if (jakeboxId === null) {
      localStorage.clear();
      window.location.href = "/setup";
      throw "Id not found";
    }
    return jakeboxId;
  };

  console.log(jakeboxId);

  useEffect(() => {
    getDeviceControls(deviceId).then((r) =>
      setDeviceCommands(r as DeviceCommand[])
    );
    getJakeboxId().then((r) => setJakeboxId(r as JakeboxId));
  }, []);

  const deviceCommanCards = deviceCommands.map((command) => {
    return (
      <CardWrapper
        onClick={() => {
          sendCommand(deviceId, command.command, command.argument);
          if (command.command === "netflix") {
            netflixGet(`/next/${command.argument}`);
          } else if (command.command === "tv" || command.command === "off") {
            netflixPost(
              `/url`,
              {
                url: "https://berit-tv.jakoblj.xyz/mac",
                userid: _getJakeboxId().id,
              },
              _getJakeboxId().id
            );
          } else if (command.command === "jakeTvBoxUrl") {
            netflixPost(
              `/url`,
              {
                url: command.argument,
                userid: _getJakeboxId().id,
              },
              _getJakeboxId().id
            );
          }
        }}
      >
        <CardIconWrapperWrapper>
          <CardIconWrapper>
            <CardIcon src={`/icons/controls/${command.image}`} />
          </CardIconWrapper>
        </CardIconWrapperWrapper>
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
