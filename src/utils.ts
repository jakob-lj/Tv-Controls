import express from "express";

const randomString = (): string => {
  let outString: string = "";
  let inOptions: string = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 32; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
};

const days = (n: number) => {
  return n * 24 * 60 * 60;
};

const requireBodyElement = (req: express.Request, property: string) => {
  return req.body[property] !== undefined;
};

export { randomString, days, requireBodyElement };
