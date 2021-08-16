import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import styled from "styled-components";
import { getCurrentDevice } from "../api/api";
import { getDefaultDevice } from "../utils/utils";

interface HeaderParams {
  deviceId: string;
}

const HeaderWrapper = styled.div`
  position: fixed;
  padding: 2em;
  width: 100%;
  background: #b76e6e;
  display: flex;
  align-itmes: center;
  color: white;
  text-align: center;
`;

const HeaderLink = styled.button`
  text-decoration: none;
  color: white;
  background: #374089;
  padding: 1em;
  margin-left: 1em;
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: -1em;

  &:hover {
    bakground: #48619a;
    cursor: pointer;
  }
`;

const Header: React.FC<HeaderParams> = ({ deviceId }) => {
  const [currentDevice, setCurrentDevice] = useState<string | null>(null);

  const history = useHistory();

  useEffect(() => {
    getCurrentDevice(deviceId).then((r) => console.log(r));
    getCurrentDevice(deviceId).then((r) => setCurrentDevice(r));
  }, []);

  if (getDefaultDevice() !== null || currentDevice === null) {
    return null;
  }

  return (
    <HeaderWrapper>
      Styrer: {currentDevice}
      <HeaderLink onClick={() => history.push("/")}>Endre enhet</HeaderLink>
    </HeaderWrapper>
  );
};

export default Header;
