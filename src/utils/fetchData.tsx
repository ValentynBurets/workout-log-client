export const exerciseOptions = {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': '76c0fe9860msha0283592c7063b0p1e52f6jsn1e0226dc905a',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5997c680b4msh5680c3fdf20d253p1b9b89jsndcaa8db0a8cb',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url: string, options: RequestInit | undefined) => {
  const response = await fetch(url, options);

  const data = await response.json();

  return data;
};
