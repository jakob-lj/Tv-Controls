const getDefaultDevice = (): string | null => {
  return localStorage.getItem("defaultDevice");
};

const setDefaultDevice = (deviceId: string) => {
  localStorage.setItem("defaultDevice", deviceId);
};

const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export { getDefaultDevice, setDefaultDevice, setAccessToken, getAccessToken };
