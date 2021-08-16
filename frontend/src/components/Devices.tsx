import React, { useEffect, useState } from "react";
import { getDevices } from "../api/api";
import { Wrapper, CardWrapper, CardIcon, CardTitle } from "./Crad";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Device = {
  name: string;
  image: string;
  id: string;
};

const DeviceLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDevices().then((r) => setDevices(r as Device[]));
  }, []);

  const deviceCards = devices.map((dev) => {
    return (
      <DeviceLink to={`/control/${dev.id}`}>
        <CardWrapper>
          <CardIcon src={dev.image} alt={dev.name} />
          <CardTitle>{dev.name}</CardTitle>
        </CardWrapper>
      </DeviceLink>
    );
  });

  return <Wrapper>{deviceCards}</Wrapper>;
};

export default Devices;
