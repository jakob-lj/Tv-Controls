import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ControlWrapper = styled.div`
  display: flex;
`;

interface RouteParams {
  deviceId: string;
}

const Control: React.FC = () => {
  const params = useParams<RouteParams>();

  console.log(params);
  return (
    <ControlWrapper>
      <div></div>
    </ControlWrapper>
  );
};

export default Control;
