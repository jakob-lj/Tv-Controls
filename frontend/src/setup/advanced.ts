import { getAccessTokenForEasyInstall } from "../api/api";
import { setAccessToken } from "../utils/utils";

const advancedSetup = async (password: string) => {
  const at = await getAccessTokenForEasyInstall(password);
  setAccessToken(at);
};

export { advancedSetup };
