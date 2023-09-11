import { createClient } from "https://cdn.jsdelivr.net/npm/@sanity/client@6.4.11/+esm";
import imageUrlBuilder from "https://cdn.jsdelivr.net/npm/@sanity/image-url@1.0.2/+esm";

const client = createClient({
  projectId: "81b7ua12",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});
const builder = imageUrlBuilder(client);

const getCategories = async () => {
  const categories = client.fetch('*[_type == "creative"]');
  return categories;
};

const splide = new Splide(".splide", {
  arrows: false,
  lazy: true,
  keyboard: "global",
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

const handleNavButtonDisable = (to) => {
  console.log(to);
  const navButtons = document.querySelectorAll(".slider__nav-button");
  if (to === 0) {
    navButtons[0].classList.add("slider__nav-button--disabled");
  } else if (to === splide.length - 1) {
    navButtons[1].classList.add("slider__nav-button--disabled");
  } else {
    navButtons.forEach((button) => {
      button.classList.remove("slider__nav-button--disabled");
    });
  }
};

const navButtonDisableListenerSetup = () => {
  splide.on("move", handleNavButtonDisable);
};

const createFilterButtons = (categories) => {
  const filterButtonsContainer = document.querySelector(
    ".slider__filter-button-container"
  );

  // Create the 'all' button first
  const allButton = document.createElement("button");
  allButton.className = "slider__filter-button slider__filter-button--selected";
  allButton.type = "button";
  allButton.textContent = "all";
  filterButtonsContainer.appendChild(allButton);

  // Create buttons for each category
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "slider__filter-button";
    button.type = "button";
    button.textContent = category.title.toLowerCase();
    filterButtonsContainer.appendChild(button);
  });
};

const handleFilterButtonClick = (categories, event) => {
  const clickedButton = event.target;
  const filterButtons = document.querySelectorAll(".slider__filter-button");

  // Remove the selected class from all buttons and add it to the clicked button
  filterButtons.forEach((button) => {
    button.classList.remove("slider__filter-button--selected");
  });
  clickedButton.classList.add("slider__filter-button--selected");

  // Determine which category's slides to return
  const selectedCategory = clickedButton.textContent;

  if (selectedCategory === "all") {
    // If 'all' is selected, concatenate all slide arrays and return
    return categories.reduce((allSlides, category) => {
      return allSlides.concat(category.slides);
    }, []);
  } else {
    // Otherwise, find the category and return its slides
    const category = categories.find(
      (cat) => cat.title.toLowerCase() === selectedCategory
    );
    return category ? category.slides : [];
  }
};

const createSlide = (slideData) => {
  const slide = document.createElement("li");
  slide.classList.add("splide__slide");

  if (slideData.image) {
    const img = document.createElement("img");
    const src = builder.image(slideData.image.asset._ref).url();
    const srcset =
      builder.image(slideData.image.asset._ref).width(320).url() +
      " 320w," +
      builder.image(slideData.image.asset._ref).width(480).url() +
      " 480w," +
      builder.image(slideData.image.asset._ref).width(800).url() +
      " 800w";
    img.setAttribute("src", src);
    img.setAttribute("srcset", srcset);
    img.setAttribute(
      "sizes",
      "(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
    );

    // Set alt text based on slideTitle or default to 'Slider Image'
    const altText = slideData.slideTitle
      ? slideData.slideTitle
      : "Slider Image";
    img.setAttribute("alt", altText);

    slide.appendChild(img);
  } else if (slideData.videoIdentifier) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      `https://player.vimeo.com/video/${slideData.videoIdentifier}`
    );
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen");
    iframe.setAttribute("allowfullscreen", "");
    slide.appendChild(iframe);
  }

  return slide;
};

const updateSlides = (slides) => {
  splide.remove(".splide__slide");
  slides.forEach((slide) => {
    splide.add(createSlide(slide));
  });
  handleNavButtonDisable(0);
};

const filterButtonEventListenerSetup = (categories) => {
  const filterButtons = document.querySelectorAll(".slider__filter-button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const slidesToShow = handleFilterButtonClick(categories, event);
      updateSlides(slidesToShow); // Here you can handle how you want to display the slides
    });
  });
};
const setInitialSlides = (categories) => {
  const event = { target: document.querySelector(".slider__filter-button") };
  const allSlides = handleFilterButtonClick(categories, event);
  updateSlides(allSlides);
};
const main = async () => {
  const categories = await getCategories();
  navButtonsEventListenerSetup();
  createFilterButtons(categories);
  filterButtonEventListenerSetup(categories);
  setInitialSlides(categories);
  navButtonDisableListenerSetup();
};

main();
