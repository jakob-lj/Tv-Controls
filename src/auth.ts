import process from "process";

const getPta = () => {
  if (process.env.PTA) {
    return process.env.PTA;
  } else {
    throw "Missing environment variable PTA";
  }
};

export { getPta };
