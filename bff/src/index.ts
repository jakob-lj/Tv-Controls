import express from "express";
import { CommandProps, send } from "./commandUtils";
import {
  authenticated,
  AuthenticatedRequest,
  generateJwt,
  requireAuthz,
} from "./auth";
import { requireBodyElement } from "./utils";
import config from "./config";
import { Role } from "./authTypes";
import cors from "cors";
import { getDefaultDevice } from "./devices";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/defaultDevice", (req, res) => {
  res.send({ device: getDefaultDevice() });
});

app.get("/testAuth/:deviceId", authenticated, (req, res) => {
  const role = (req as AuthenticatedRequest).userRole;
  if (!requireAuthz(role, req.params.deviceId)) return res.status(401).send();
  res.send("ok");
});

app.post("/api/login", (req, res) => {
  if (req.body.pass) {
    if (req.body.pass === config.USERPASSWORD) {
      res.send(generateJwt(Role.USER));
    } else if (req.body.pass === config.ADMINPASSWORD) {
      res.send(generateJwt(Role.ADMIN));
    }
  }
  res.status(401).send();
});

// app.post("/test/", (req, res) => {
//   const command = buildCommand({ command: "volume", argument: 10 });
//   sendCommand(getTestId(), command);
//   res.send("ok");
// });

app.post("/device/:deviceId/command", authenticated, (req, res) => {
  const role = (req as AuthenticatedRequest).userRole;
  if (!requireAuthz(role, req.params.deviceId)) return res.status(401).send();
  if (!requireBodyElement(req, "command")) return res.status(400).send();
  const command = req.body.command as CommandProps;
  send(req.params.deviceId, command);
  res.send("ok");
});

app.listen(8000, () => {
  console.log("Listeing at 8000");
});
