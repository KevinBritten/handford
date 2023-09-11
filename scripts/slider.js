const splide = new Splide(".splide", {
  arrows: false,
}).mount();

const changeSlide = (direction) => {
  splide.go(direction);
};

const navButtonsEventListenerSetup = () => {
  const navButtons = document.querySelectorAll(".slider__nav-button");
  navButtons[0].addEventListener("click", (event) => {
    event.preventDefault();

    changeSlide("-1");
  });

  navButtons[1].addEventListener("click", (event) => {
    event.preventDefault();

    changeSlide("+1");
  });
};

navButtonsEventListenerSetup();

const testData = {};
