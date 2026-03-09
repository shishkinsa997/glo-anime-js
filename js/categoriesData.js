const categoriesData = () => {
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
  const ganreParams = new URLSearchParams(window.location.search).get("ganre");

  data.forEach((item) => {
    ganres.add(item.ganre);
  });
  renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
  if (ganreParams) {
    renderAnimeList(data, [ganreParams]);
  } else {
    renderAnimeList(data, ganres);
  }
  renderGanreList(ganres);
}

function renderTopAnime(array) {
  const wrapper = document.querySelector(".filter__gallery");

  array.forEach((element) => {
    wrapper.insertAdjacentHTML(
      "beforeend",
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
  const wrapper = document.querySelector(".product-page .col-lg-8");
  const preloader = document.querySelector(".preloder");

  ganres.forEach((ganre) => {
    const productBlock = document.createElement("div");
    productBlock.classList.add("mb-5");
    const listBlock = document.createElement("div");
    const list = array.filter((item) => item.tags.includes(ganre));

    listBlock.classList.add("row");

    productBlock.insertAdjacentHTML(
      "beforeend",
      `<div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8">
          <div class="section-title">
            <h4>${ganre}</h4>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
          <div class="btn__all">
            <a href="/categories.html?ganre=${ganre}" class="primary-btn"
              >View All <span class="arrow_right"></span
            ></a>
          </div>
        </div>
      </div>`,
    );

    list.forEach((item) => {
      const tagsBlock = document.createElement("ul");
      item.tags.forEach((tag) => {
        tagsBlock.insertAdjacentHTML("beforeend", `<li>${tag}</li>`);
      });

      listBlock.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-4 col-md-6 col-sm-6">
      <div class="product__item">
        <div
          class="product__item__pic set-bg"
          data-setbg="${item.image}"
        >
          <div class="ep">${item.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
        </div>
        <div class="product__item__text">
        ${tagsBlock.outerHTML}
          <h5>
            <a href="/anime-details.html?itemId=${item.id}"
              >${item.title}</a
            >
          </h5>
        </div>
      </div>`,
      );
    });

    productBlock.append(listBlock);
    wrapper.append(productBlock);
    wrapper.querySelectorAll(".set-bg").forEach((element) => {
      element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });
  });
  setTimeout(() => {
    preloader.classList.remove("active");
  }, 500);
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

categoriesData();
