const detailsData = () => {
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
  const ganreParams = new URLSearchParams(window.location.search).get("itemId");

  data.forEach((item) => {
    ganres.add(item.ganre);
  });

  if (ganreParams) {
    renderAnimeDetails(data, ganreParams);
  } else {
    console.log("Anime is missing!");
  }
  renderGanreList(ganres);
}

function renderAnimeDetails(array, itemId) {
  const animeObj = array.find((item) => item.id == itemId);
  const preloader = document.querySelector(".preloder");
  const imageBlock = document.querySelector(".anime__details__pic");
  const viewsBlock = imageBlock.querySelector(".view");
  const titleBlock = document.querySelector(".anime__details__title h3");
  const subtitleBlock = document.querySelector(".anime__details__title span");
  const descBlock = document.querySelector(".anime__details__text p");
  const widgetList = document.querySelectorAll(".anime__details__widget ul li");
  const breadCrumb = document.querySelector(".breadcrumb__links span");
  if (animeObj) {
    imageBlock.dataset.setbg = animeObj.image;
    viewsBlock.insertAdjacentHTML(
      "beforeend",
      `<i class="fa fa-eye"></i> ${animeObj.views}`,
    );
    titleBlock.textContent = animeObj.title;
    subtitleBlock.textContent = animeObj["original-title"];
    descBlock.textContent = animeObj.description;

    widgetList[0].insertAdjacentHTML(
      "beforeend",
      `<span>Date aired:</span>${animeObj.date}`,
    );
    widgetList[1].insertAdjacentHTML(
      "beforeend",
      `<span>Status:</span>${animeObj.rating}`,
    );
    widgetList[2].insertAdjacentHTML(
      "beforeend",
      `<span>Genre:</span>${animeObj.tags.join(", ")}`,
    );

    breadCrumb.textContent = animeObj.ganre;

    document.querySelectorAll(".set-bg").forEach((element) => {
      element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });

    setTimeout(() => {
      preloader.classList.remove("active");
    }, 500);
  } else {
    console.log("Anime is missing!");
  }
}

function renderGanreList(ganres) {
  const dropdownBlock = document.querySelector(".header__menu .dropdown");

  ganres.forEach((ganre) => {
    dropdownBlock.insertAdjacentHTML(
      "beforeend",
      `<a href="/categories.html?ganre=${ganre}">${ganre}</a>`,
    );
  });
}

detailsData();
