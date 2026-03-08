const mainData = () => {
  const url = "https://glo-anime-js-default-rtdb.firebaseio.com/anime.json";
  const localUrl = "./db.json";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return fetch(localUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((localData) => {
          console.log(localData);
          return localData;
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

mainData();
