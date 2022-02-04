import { getAccessToken } from "../utils/utils";
import { DeviceCommand, JakeboxId, TvDevice } from "./types";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${window.location.origin}`
    : "http://localhost:8000";

const post = (endpoint: string, body: any) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

const postAuthed = (endpoint: string, body: any) => {
  console.log("fethcing");
  return fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(body),
  });
};

const getAuthed = (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

const getDefaultDeviceForEasySetup = async () => {
  const endpoint = "/api/defaultDevice";
  const response = await getAuthed(endpoint).then((r) => r.json());
  return response.device;
};

const getAccessTokenForEasyInstall = async (
  password: string
): Promise<string> => {
  return await post("/api/login", { pass: password }).then((r) => r.text());
};

const getDevices = async (): Promise<TvDevice[]> => {
  return getAuthed("/api/devices").then((r) => r.json());
};

const getDeviceControls = async (
  deviceId: string
): Promise<DeviceCommand[]> => {
  return await getAuthed(`/api/device/${deviceId}/controls`).then((r) =>
    r.json()
  );
};

const getJakeboxId = async (): Promise<JakeboxId> => {
  return await getAuthed(`/api/secret/jakebox-id`).then((r) => r.json());
};

const sendCommand = async (
  deviceId: string,
  command: string,
  argument: string | number
) => {
  console.log("posting");
  postAuthed(`/api/device/${deviceId}/command`, {
    command: { command: command, argument: argument },
  });
};

const getCurrentDevice = async (deviceId: string): Promise<string> => {
  return await getAuthed(`/api/device/${deviceId}/description`)
    .then((r) => r.json())
    .then((r) => r.description);
};

export {
  getDefaultDeviceForEasySetup,
  getAccessTokenForEasyInstall,
  getDevices,
  getDeviceControls,
  sendCommand,
  getJakeboxId,
  getCurrentDevice,
};
