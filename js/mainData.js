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
      processData(data);
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
          processData(localData.anime);
          return localData.anime;
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

function processData(data) {
  const ganres = new Set();
  renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
  data.forEach((item) => {
    ganres.add(item.ganre);
  });
  renderAnimeList(data, ganres);
}

function renderTopAnime(array) {
  const wrapper = document.querySelector(".filter__gallery");
  wrapper.innerHTML = "";
  array.forEach((element) => {
    wrapper.insertAdjacentHTML(
      "afterbegin",
      `
      <div
        class="product__sidebar__view__item set-bg mix"
        data-setbg="${element.image}"
      >
        <div class="ep">${element.rating} / 10</div>
        <div class="view"><i class="fa fa-eye"></i> ${element.views}</div>
        <h5>
          <a href="/anime-details.html"
            >${element.title}</a
          >
        </h5>
      </div>
      `,
    );
    wrapper.querySelectorAll(".set-bg").forEach((element) => {
      element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });
  });
}
function renderAnimeList(array, ganres) {
  console.log(array);
  console.log(ganres);
  

}

mainData();
