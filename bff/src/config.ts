import process from "process";
import dotenv from "dotenv";
import { randomString } from "./utils";
class AppConfig {
  PTA: string;
  JWTKEY: string;
  USERPASSWORD: string;
  ADMINPASSWORD: string;
  NETFLIX_BFF: string;

  constructor(env: NodeJS.ProcessEnv) {
    this.PTA = env.PTA!!;
    this.JWTKEY = getValueOrDefault(env.SIGNINGKEY, "secret");
    this.USERPASSWORD = getValueOrDefault(env.USERPASSWORD, "user");
    this.ADMINPASSWORD = getValueOrDefault(env.ADMINPASSWORD, "admin");
    this.NETFLIX_BFF = getValueOrDefault(
      env.NETFLIX_BFF,
      "https://netflix.jakoblj.xyz"
    );

    console.log("Using singing key: ", this.JWTKEY);
  }
}

const getValueOrDefault = (
  keyValue: string | undefined,
  defaultValue: string
) => {
  if (keyValue !== undefined) return keyValue;
  return isLocal() ? defaultValue : randomString();
};

const isLocal = () => {
  return process.env.NODE_ENV === "local";
};

if (isLocal()) {
  dotenv.config();
}

const config = new AppConfig(process.env);

export default config;
