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
  netflixInput: string;
};

const teliaBaseUrl = "https://teliaplay.no/se/direkte";
const telia = (endUrl: string) => `${teliaBaseUrl}/${endUrl}`;

const tvIdMappings: TvMapping[] = [
  {
    logicalId: "VCJIUmnw",
    smartThingsId: "d4a3d888-9c9d-4755-93a1-a290574e9b0e",
    description: "Bjerkebakken",
    requiredPrincipal: Role.ADMIN,
    image: "/bjerkebakken.png",
    properties: {
      tvInput: "HDMI3",
      netflixInput: "HDMI2",
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
        argument: 15,
      },
      {
        command: "volume",
        description: "Høy lyd",
        image: "high-volume.png",
        argument: 20,
      },
      {
        command: "tv",
        description: "Se TV",
        image: "tv.png",
        argument: null,
      },
      {
        command: "channelUp",
        description: "Kanal opp",
        image: "channel-up.png",
        argument: null,
      },
      {
        command: "channelDown",
        description: "Kanal ned",
        image: "channel-down.png",
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
      netflixInput: "HDMI2",
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
        command: "netflix",
        description: "The Crown",
        image: "the-crown.jpg",
        argument: "80025678",
      },
      {
        command: "jakeTvBoxUrl",
        description: "Nrk 1",
        image: "nrk1.jpg",
        argument: telia("nrk1-oslo-og-viken"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "Nrk 2",
        image: "nrk2.png",
        argument: telia("nrk2"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "Nrk 3",
        image: "nrk3.png",
        argument: telia("nrk3"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2",
        image: "tv2.png",
        argument: telia("tv-2"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2 Zebra",
        image: "tv2z.png",
        argument: telia("tv-2-zebra"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV Norge",
        image: "tvnorge.png",
        argument: telia("tvnorge"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "Max",
        image: "max.png",
        argument: telia("max"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 3",
        image: "tv3.png",
        argument: telia("tv3"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "Viasat 4",
        image: "v4.svg",
        argument: telia("v4"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2 Nyhetskanalen",
        image: "tv2n.png",
        argument: telia("tv-2-nyhetskanalen"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "Fem",
        image: "fem.png",
        argument: telia("fem"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2 Livsstil",
        image: "tv2l.png",
        argument: telia("tv-2-livsstil"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2 Sport 1",
        image: "tv2s1.png",
        argument: telia("tv-2-sport-1"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 2 Sport 2",
        image: "tv2s2.png",
        argument: telia("tv-2-sport-2"),
      },
      {
        command: "jakeTvBoxUrl",
        description: "TV 6",
        image: "tv6.png",
        argument: telia("tv6"),
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
