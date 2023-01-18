import ConnectionConfig from "../assets/jsonData/ConnectionConfig/ConnectionConfig.json"

export const exerciseOptions = {
  method: "GET",
//   url: {ConnectionConfig.RapidApi} + "bodyPartList",
  headers: {
    "X-RapidAPI-Key": "5997c680b4msh5680c3fdf20d253p1b9b89jsndcaa8db0a8cb",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(ConnectionConfig.RapidApi + url, options);

  const data = await response.json();

  return data;
};
