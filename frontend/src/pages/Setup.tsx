import React, { useState } from "react";
import styled from "styled-components";
import easy from "./../assets/easy_install.png";
import advanced from "./../assets/advanced_install.png";
import loading from "./../assets/loading.png";
import { easySetup } from "../setup/easy";
import { Redirect } from "react-router-dom";
import { advancedSetup } from "../setup/advanced";

const SetupWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const SetupCardWrapper = styled.div`
  display: flex;
  margin: 2em;
  flex-direction: column;
  width: 200px;
  padding: 3em;
  padding-right: 3em;
  padding-left: 3em;
  background: #a4c5f9;
  border-radius: 9px;
  padding-right: 6em;
  padding-left: 6em;
  text-align: center;
  height: min-content;

  &:hover {
    background-color: #39486c;
    cursor: pointer;
  }
`;

const SetupCardIcon = styled.img``;

const SetupCardTitle = styled.h3``;

enum SetupCardType {
  EASY,
  ADVANCED,
}

type SetupCardTypes = {
  onClick: Function;
  type: SetupCardType;
};

const SetupCard: React.FC<SetupCardTypes> = (props) => {
  return (
    <SetupCardWrapper onClick={() => props.onClick()}>
      <SetupCardIcon
        src={props.type === SetupCardType.EASY ? easy : advanced}
        alt={
          props.type === SetupCardType.EASY
            ? "Easy install icon"
            : "Advanced instal icon"
        }
      />
      <SetupCardTitle>
        {props.type === SetupCardType.EASY ? "Easy setup" : "Advanced setup"}
      </SetupCardTitle>
    </SetupCardWrapper>
  );
};

const LoadingCard: React.FC = () => {
  return (
    <SetupCardWrapper>
      <SetupCardIcon src={loading} alt={"Loading"} />
      <SetupCardTitle>Setter opp</SetupCardTitle>
    </SetupCardWrapper>
  );
};

const Setup: React.FC = () => {
  const startSetup = () => {
    switch (setupType) {
      case SetupCardType.ADVANCED:
        startAdvancedSetup();
        break;
      default:
        startEasySetup();
    }
  };

  const startEasySetup = async () => {
    setIsSettingUp(true);
    setCanType(false);
    await easySetup(password);
    setSetupFinished(true);
  };

  const startAdvancedSetup = async () => {
    setIsSettingUp(true);
    setCanType(false);
    await advancedSetup(password);
    setSetupFinished(true);
  };

  const [isFinished, setSetupFinished] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [password, setPassword] = useState("");
  const [canType, setCanType] = useState(false);
  const [setupType, setSetupType] = useState<SetupCardType>(SetupCardType.EASY);

  if (isFinished) {
    return <Redirect to={"/"} />;
  }

  return (
    <SetupWrapper>
      {!isSettingUp &&
        (canType ? (
          <>
            <h2>Enter password</h2>
            <input
              type={"text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={startSetup}>Submit</button>{" "}
          </>
        ) : (
          <>
            <SetupCard
              onClick={() => {
                setCanType(true);
                setSetupType(SetupCardType.EASY);
              }}
              type={SetupCardType.EASY}
            />
            <SetupCard
              onClick={() => {
                setCanType(true);
                setSetupType(SetupCardType.ADVANCED);
              }}
              type={SetupCardType.ADVANCED}
            />
          </>
        ))}
      {isSettingUp && <LoadingCard />}
    </SetupWrapper>
  );
};

export default Setup;
