import process from "process";
import dotenv from "dotenv";
import { createSecretKey } from "crypto";
import { randomString } from "./utils";
class AppConfig {
  PTA: string;
  JWTKEY: string;
  USERPASSWORD: string;
  ADMINPASSWORD: string;

  constructor(env: NodeJS.ProcessEnv) {
    this.PTA = env.PTA!!;
    this.JWTKEY = getValueOrDefault(env.SIGNINGKEY, "secret");
    this.USERPASSWORD = getValueOrDefault(env.USERPASSWORD, "user");
    this.ADMINPASSWORD = getValueOrDefault(env.ADMINPASSWORD, "admin");
  }
}

const getValueOrDefault = (
  keyValue: string | undefined,
  defaultValue: string
) => {
  return keyValue ?? isLocal() ? defaultValue : randomString();
};

const isLocal = () => {
  return process.env.NODE_ENV === "local";
};

if (isLocal()) {
  dotenv.config();
}

const config = new AppConfig(process.env);

export default config;
