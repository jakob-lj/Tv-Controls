import { Role } from "./authTypes";

type TvControl = {
  command: string;
  image: string;
  description: string;
  argument: string | number | null;
};

type TvMapping = {
  logicalId: string;
  smartThingsId: string;
  description: string;
  image: string;
  requiredPrincipal: Role;
  properties: DeviceProperties;
  controls: TvControl[];
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
    image: "/bjerkebakken.png",
    properties: {
      tvInput: "HDMI3",
    },
    controls: [
      {
        command: "on",
        description: "Slå på",
        image: "power-on.png",
        argument: null,
      },
      {
        command: "off",
        description: "Slå av",
        image: "power-off.png",
        argument: null,
      },
      {
        command: "mute",
        description: "Lyd av",
        image: "mute.png",
        argument: null,
      },
      {
        command: "volume",
        description: "Lav lyd",
        image: "low-volume.png",
        argument: 10,
      },
      {
        command: "volume",
        description: "Medium lyd",
        image: "medium-volume.png",
        argument: 25,
      },
      {
        command: "volume",
        description: "Høy lyd",
        image: "high-volume.png",
        argument: 40,
      },
      {
        command: "tv",
        description: "Se TV",
        image: "tv.png",
        argument: null,
      },
    ],
  },
  {
    logicalId: "FDVoyNzs",
    smartThingsId: "6ec97df5-e513-2632-ffad-a7db6202520e",
    description: "Søkredalsveien",
    image: "/old-woman.png",
    requiredPrincipal: Role.USER,
    properties: {
      tvInput: "HDMI1",
    },
    controls: [
      {
        command: "on",
        description: "Slå på",
        image: "power-on.png",
        argument: null,
      },
      {
        command: "off",
        description: "Slå av",
        image: "power-off.png",
        argument: null,
      },
      {
        command: "mute",
        description: "Lyd av",
        image: "mute.png",
        argument: null,
      },
      {
        command: "volume",
        description: "Lav lyd",
        image: "low-volume.png",
        argument: 10,
      },
      {
        command: "volume",
        description: "Medium lyd",
        image: "medium-volume.png",
        argument: 25,
      },
      {
        command: "volume",
        description: "Høy lyd",
        image: "high-volume.png",
        argument: 40,
      },
      {
        command: "tv",
        description: "Se TV",
        image: "tv.png",
        argument: null,
      },
    ],
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

const getDefaultDevice = () => {
  return "FDVoyNzs";
};

const getDeviceProps = (logicalId: string): DeviceProperties => {
  return getDeviceByLogicalId(logicalId)!!.properties;
};

const devicesList = (forRole: Role) => {
  return tvIdMappings
    .filter(
      (dev) =>
        dev.requiredPrincipal === forRole || dev.requiredPrincipal === Role.USER
    )
    .map((dev) => ({
      name: dev.description,
      image: dev.image,
      id: dev.logicalId,
    }));
};

const getDeviceControls = (deviceId: string): TvControl[] => {
  return getDeviceByLogicalId(deviceId)?.controls ?? [];
};

const getDeviceDescription = (deviceId: string): string => {
  return getDeviceByLogicalId(deviceId)?.description ?? "Unkown";
};

export {
  getSmartId,
  getTestId,
  getPrincipalByLogicalId,
  getDeviceProps,
  getDefaultDevice,
  devicesList,
  getDeviceControls,
  getDeviceDescription,
  DeviceProperties,
  TvMapping,
};
