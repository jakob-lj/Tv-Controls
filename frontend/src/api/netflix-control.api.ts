const netflixBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001"
    : "https://netflix.jakoblj.xyz";

const netflixPost = (
  endpoint: string,
  body: any,
  userid: string
): Promise<any> => {
  return fetch(`${netflixBaseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      userid: userid,
    },
    body: JSON.stringify(body),
  });
};
const netflixGet = (endpoint: string): Promise<any> => {
  return fetch(`${netflixBaseUrl}${endpoint}`, {
    headers: { userid: "a116a760-f8fc-475e-8c8e-0534d85252b5" },
  });
};

export { netflixPost, netflixGet };
