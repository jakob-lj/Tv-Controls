import { Role } from "./authTypes";

type TvMapping = {
  logicalId: string;
  smartThingsId: string;
  description: string;
  requiredPrincipal: Role;
  properties: DeviceProperties;
};

type DeviceProperties = {
  tvInput: string;
};

const tvIdMappings: TvMapping[] = [
  {
    logicalId: "VCJIUmnw",
    smartThingsId: "d4a3d888-9c9d-4755-93a1-a290574e9b0e",
    description: "Bjerkebakken",
    requiredPrincipal: Role.ADMIN,
    properties: {
      tvInput: "HDMI3",
    },
  },
  {
    logicalId: "FDVoyNzs",
    smartThingsId: "6ec97df5-e513-2632-ffad-a7db6202520e",
    description: "Søkredalsveien",
    requiredPrincipal: Role.USER,
    properties: {
      tvInput: "HDMI1",
    },
  },
];

const getSmartId = (logicalId: string): string | null => {
  const smartId = tvIdMappings.find(
    (element) => element.logicalId === logicalId
  );
  if (smartId) {
    return smartId.smartThingsId;
  } else {
    return null;
  }
};

const getDeviceByLogicalId = (logicalId: string): TvMapping | null => {
  const device = tvIdMappings.find(
    (element) => element.logicalId === logicalId
  );
  if (device) {
    return device;
  } else {
    return null;
  }
};

const getPrincipalByLogicalId = (logicalId: string) => {
  return getDeviceByLogicalId(logicalId)!!.requiredPrincipal;
};

const getTestId = (): string => {
  return getSmartId("VCJIUmnw")!!;
};

const getDeviceProps = (logicalId: string): DeviceProperties => {
  return getDeviceByLogicalId(logicalId)!!.properties;
};

export {
  getSmartId,
  getTestId,
  getPrincipalByLogicalId,
  getDeviceProps,
  DeviceProperties,
  TvMapping,
};
