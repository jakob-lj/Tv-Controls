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
import {
  devicesList,
  getDefaultDevice,
  getDeviceControls,
  getDeviceDescription,
} from "./devices";

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  const staticFiles = [".js", ".jpg", ".png", ".css", ".ico", ".txt"];
  if (staticFiles.some((it) => req.originalUrl.includes(it))) {
    res.sendFile(__dirname + "/static/" + req.originalUrl);
  } else {
    res.sendFile(__dirname + "/static/");
  }
});

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello world");
});

app.get("/api/defaultDevice", authenticated, (req, res) => {
  res.send({ device: getDefaultDevice() });
});

app.get("/api/devices", authenticated, (req, res) => {
  res.send(devicesList((req as AuthenticatedRequest).userRole));
});

app.get("/api/device/:deviceId/controls", authenticated, (req, res) => {
  const role = (req as AuthenticatedRequest).userRole;
  if (!requireAuthz(role, req.params.deviceId)) return res.status(401).send();
  res.send(getDeviceControls(req.params.deviceId));
});
app.get("/api/testAuth/:deviceId", authenticated, (req, res) => {
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

app.post("/api/device/:deviceId/command", authenticated, (req, res) => {
  const role = (req as AuthenticatedRequest).userRole;
  if (!requireAuthz(role, req.params.deviceId)) return res.status(401).send();
  if (!requireBodyElement(req, "command")) return res.status(400).send();
  console.log("got command", req.body.command);
  const command = req.body.command as CommandProps;
  send(req.params.deviceId, command);
  res.send("ok");
});

app.get("/api/device/:deviceId/description", authenticated, (req, res) => {
  const role = (req as AuthenticatedRequest).userRole;
  if (!requireAuthz(role, req.params.deviceId)) return res.status(401).send();
  res.send({ description: getDeviceDescription(req.params.deviceId) });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listeing at " + port);
});
