// HandfordHomepageCode.js

function throttle(callback, limit) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}
const setSectionHeaderOffset = () => {
  const sectionHeaders = document.querySelectorAll(".section-header");
  const gutter = parseInt(
    window.getComputedStyle(sectionHeaders[0]).marginLeft.replace(/\D/g, "")
  );
  for (let header of sectionHeaders) {
    header.style.transform = `translateX(${
      (header.getBoundingClientRect().width + gutter + 30) * -1
    }px)`;
    header.style.opacity = "1";
  }
};
const setSectionHeaderTransitions = () => {
  const sectionHeaders = document.querySelectorAll(".section-header");
  for (let header of sectionHeaders) {
    header.style.transition = "transform ease 1s, opacity ease .5s";
  }
};
const processItemShow = (i) => {
  const processItems = Array.from(
    document
      .getElementById("desktop-content-process-container")
      .getElementsByClassName("content-process")
  );
  const processNumbers = document.querySelectorAll(".web-process-number.light");
  processItems.forEach((item, index) => {
    if (!item.classList.contains(`_${i + 1}`)) {
      item.style.display = "none";
      processNumbers[index].classList.remove("--0-opacity-desktop");
    } else {
      item.style.display = "block";
      processNumbers[index].classList.add("--0-opacity-desktop");
    }
  });
};

const processItemEventListenerSetup = () => {
  document.querySelectorAll(".web-process-number.light").forEach((e, i) => {
    e.addEventListener("mouseenter", () => {
      processItemShow(i);
    });
  });
};

const setHeroHeight = () => {
  document.querySelector(
    ".section-grid.hero"
  ).style.height = `${window.innerHeight}px`;
  //   ).style.height = "667px";
  //   ).style.height = "1180px";
};
const workButtonEventListenerSetup = () => {
  document.querySelectorAll(".work__button").forEach((e) => {
    e.addEventListener("click", () => {
      filterWorkImages(e.attributes["filter-by"].value);
    });
  });
};
const toggleMenu = () => {
  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.toggle("--in-view");
  mobileMenu.classList.contains("--in-view")
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "initial");
};
const toggleMenuEventListenerSetup = () => {
  const toggleButtons = document.querySelectorAll(
    ".hamburger-menu, .close-btn-wrap, .nav-item"
  );
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleMenu();
    });
  });
};

const headerEventListenerSetup = () => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const windowHeight = window.innerHeight;
      const sectionHeaders = document.querySelectorAll(".section-header");
      const sections = document.querySelectorAll(".section:not(.hero-section)");
      //Edit these values to change the scroll position when the header will fade out, and when it will slide on/offscreen.
      const headerFadeStartPosition = -20;
      const headerSlideStartPosition = 0.7;
      for (let header of sectionHeaders) {
        const headerCurrentPosition =
          header.getBoundingClientRect().y / windowHeight;
        if (
          headerCurrentPosition < headerSlideStartPosition &&
          !header.classList.contains("--in-view")
        ) {
          header.classList.add("--in-view");
        } else if (
          headerCurrentPosition > headerSlideStartPosition &&
          header.classList.contains("--in-view")
        ) {
          header.classList.remove("--in-view");
        }
      }
      for (let section of sections) {
        const sectionCurrentPosition = section.getBoundingClientRect().y;
        const sectionHeader = section.querySelector(".section-header");
        if (
          sectionCurrentPosition < headerFadeStartPosition &&
          !sectionHeader.classList.contains("--faded")
        ) {
          sectionHeader.classList.add("--faded");
        } else if (
          sectionCurrentPosition > headerFadeStartPosition &&
          sectionHeader.classList.contains("--faded")
        ) {
          sectionHeader.classList.remove("--faded");
        }
      }
    }, 300)
  );
};
// Function to highlight the current section's .nav-link
function highlightCurrentNavLink() {
  // Get all the .nav-link elements
  const navLinks = document.querySelectorAll(".nav-link");

  // Get all the .section-offset-anchor elements
  const sectionAnchors = document.querySelectorAll(".section-offset-anchor");

  // If the screen isn't scrolled at least halfway, deselect all and return
  if (window.scrollY < window.innerHeight / 2) {
    navLinks.forEach((link) => link.classList.remove("--current"));
    return;
  }

  // Determine which section is currently on screen
  let currentSectionIndex = 0;
  for (let i = 0; i < sectionAnchors.length; i++) {
    // Check if the top of the section is above the middle of the viewport
    if (
      sectionAnchors[i].getBoundingClientRect().top <=
      window.innerHeight / 2
    ) {
      currentSectionIndex = i;
    } else {
      break;
    }
  }

  // Remove --current class from all nav-links
  navLinks.forEach((link) => link.classList.remove("--current"));

  // Add --current class to the current nav-link
  if (navLinks[currentSectionIndex]) {
    navLinks[currentSectionIndex].classList.add("--current");
  }
}

// Add event listener to the body scroll event with throttling
const highlightCurrentNavLinkEventListenerSetup = () => {
  document.addEventListener("scroll", highlightCurrentNavLink);
};

setSectionHeaderOffset();
setHeroHeight();
processItemEventListenerSetup();
headerEventListenerSetup();
setSectionHeaderTransitions();
// workButtonEventListenerSetup();
toggleMenuEventListenerSetup();
highlightCurrentNavLinkEventListenerSetup();
