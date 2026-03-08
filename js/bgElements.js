const bgElements = () => {
  setTimeout(() => {
    const elements = document.querySelectorAll(".set-bg");

    elements.forEach((element) => {
      element.style.backgroundImage = `url(${element.dataset.setbg})`;
    });
  }, 0);
};

bgElements();
