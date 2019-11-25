import fetch from "node-fetch";

export const fetchDataFromOMDb = async (title: string) => {
  const response = await fetch(
    `http://www.omdbapi.com/?t=${title}&&apikey=d69d325`
  );
  const data = await response.json();
  return data;
};
