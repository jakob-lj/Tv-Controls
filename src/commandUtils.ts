import fetch from "node-fetch";
import { getPta } from "./auth";
import { DeviceProperties, getDeviceProps, getSmartId } from "./devices";

type CommandArgument = string | number;

type SmartCommand = {
  command: string;
  capability: string;
  arguments: CommandArgument[];
};

type SendCommandProps = {
  smartThingsId: string;
  commands: SmartCommand[];
};

type BuildCommandProps = {
  command: string;
  argument: string | number;
  deviceProperties: DeviceProperties;
};

const send = (logicalId: string, command: CommandProps) => {
  const preProcessedCommand: BuildCommandProps = {
    ...command,
    deviceProperties: getDeviceProps(logicalId)!!,
  };
  const processedCommand = buildCommand(preProcessedCommand);
  return sendCommand(getSmartId(logicalId)!!, processedCommand);
};

const sendCommand = (smartThingsId: string, command: SmartCommand) => {
  sendTypedCommands({ smartThingsId, commands: [command] });
};

const sendCommands = (smartThingsId: string, commands: SmartCommand[]) => {
  sendTypedCommands({ smartThingsId, commands });
};

const sendTypedCommands = ({ smartThingsId, commands }: SendCommandProps) => {
  const body = {
    commands: commands,
  };

  console.log("Sending commands", body);
  fetch(`https://api.smartthings.com/v1/devices/${smartThingsId}/commands`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getPta()}`,
    },
    body: JSON.stringify(body),
  }).then((com) => console.log(com));
};

const buildCommand = ({
  command,
  argument,
  deviceProperties,
}: BuildCommandProps): SmartCommand => {
  switch (command) {
    case "volume":
      return {
        command: "setVolume",
        capability: "audioVolume",
        arguments: [argument],
      };
    case "mute":
      return {
        command: "setMute",
        capability: "audioMute",
        arguments: ["muted"],
      };
    case "on":
      return {
        command: "on",
        capability: "switch",
        arguments: [],
      };
    case "off":
      return {
        command: "off",
        capability: "switch",
        arguments: [],
      };
    case "tv":
      return {
        command: "setInputSource",
        capability: "mediaInputSource",
        arguments: [deviceProperties.tvInput],
      };
    default:
      return {
        command: "setMute",
        capability: "audioMute",
        arguments: ["unmuted"],
      };
  }
};

type CommandProps = {
  command: string;
  argument: string | number;
};

export { buildCommand, sendCommand, send, sendTypedCommands, CommandProps };
