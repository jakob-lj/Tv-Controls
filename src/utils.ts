import fetch from "node-fetch";
import { getPta } from "./auth";

type SmartCommand = {
  command: string;
  capability: string;
  arguments: string[];
};

type SendCommandProps = {
  smartThingsId: string;
  commands: SmartCommand[];
};

const sendCommand = ({ smartThingsId, commands }: SendCommandProps) => {
  const body = {
    commands: commands,
  };
  fetch(`https://api.smartthings.com/v1/devices/${smartThingsId}/commands`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getPta()}`,
    },
    body: JSON.stringify(body),
  });
};

type BuildCommandProps = {
  command: string;
  argument: string | number;
};

const buildCommand = ({
  command,
  argument,
}: BuildCommandProps): SmartCommand => {
  switch (command) {
    case "volume":
      return {
        command: "setVolume",
        capability: "audioVolume",
        arguments: [argument.toString()],
      };
    case "mute":
      return {
        command: "setMute",
        capability: "audioMute",
        arguments: ["muted"],
      };
    default:
      return {
        command: "setMute",
        capability: "audioMute",
        arguments: ["unmuted"],
      };
  }
};
