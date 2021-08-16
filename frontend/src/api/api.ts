import { getAccessToken } from "../utils/utils";
import { TvDevice } from "./types";

const baseUrl =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000";

const post = (endpoint: string, body: any) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export {
  getDefaultDeviceForEasySetup,
  getAccessTokenForEasyInstall,
  getDevices,
};
