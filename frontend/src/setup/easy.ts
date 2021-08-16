import { setAccessToken, setDefaultDevice } from "../utils/utils";

import {
  getAccessTokenForEasyInstall,
  getDefaultDeviceForEasySetup,
} from "./../api/api";

const easySetup = async (password: string) => {
  const at = await getAccessTokenForEasyInstall(password);
  setAccessToken(at);
  const defaultDevice = await getDefaultDeviceForEasySetup();
  setDefaultDevice(defaultDevice);
};

export { easySetup };
