import config from "./config";
import jwt from "jsonwebtoken";
import { days } from "./utils";
import express, { Request } from "express";
import { getPrincipalByLogicalId } from "./devices";
import { Role } from "./authTypes";

interface AuthenticatedRequest extends Request {
  userRole: Role;
}

const getPta = () => {
  return config.PTA;
};

const generateJwt = (role: Role) => {
  return jwt.sign({ role: role.valueOf() }, config.JWTKEY, {
    expiresIn: days(356 * 2),
  });
};

const authenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jsonBody = jwt.verify(token, config.JWTKEY);
    if (typeof jsonBody !== "string") {
      (req as AuthenticatedRequest).userRole =
        jsonBody.role === Role.ADMIN ? Role.ADMIN : Role.USER;
      next();
    }
  } catch (e) {
    return res.sendStatus(401);
  }
  next();
};

const requireAuthz = (principal: Role, deviceLogicalId: string) => {
  return (
    principal === Role.ADMIN ||
    getPrincipalByLogicalId(deviceLogicalId) === Role.USER
  );
};

export {
  getPta,
  generateJwt,
  authenticated,
  AuthenticatedRequest,
  requireAuthz,
};
