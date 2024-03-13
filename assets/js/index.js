let headerMenu = document.querySelector(".header__menu");

document.addEventListener("click", function (e) {
  if (e.target.closest(".header__btn")) {
    headerMenu.classList.toggle("show__menu");
  } else if (headerMenu.classList.contains("show__menu")) {
    headerMenu.classList.remove("show__menu");
  }
});

window.addEventListener("scroll", function () {
  if (headerMenu.classList.contains("show__menu")) {
    headerMenu.classList.remove("show__menu");
  }
});

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
});

let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".list__link");

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.remove("active");
        });
        console.dir(links);
        document
          .querySelector(`header nav a.list__link[href="#${entry.target.id}"]`)
          .classList.add("active");
        history.pushState(null, "", `#${entry.target.id}`);
        entry.target.classList.replace("hidden-animate", "show-animate");
      } else {
        entry.target.classList.replace("show-animate", "hidden-animate");
      }
    });
  },
  { rootMargin: "-60% 0px -40% 0px" }
);

sections.forEach((section) => {
  observer.observe(section);
});

const swiper = new Swiper(".portfolio .swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,

  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

let portfolioContainer = document.querySelector(".portfolio__content");
let showProjects = document.querySelector(".portfolio__show");
let showDegradiant = document.querySelector(".portfolio .portfolio__content");

showProjects.addEventListener("click", function (e) {
  let altura = portfolioContainer.scrollHeight;

  if (portfolioContainer.classList.contains("hidden__projects")) {
    portfolioContainer.classList.replace("hidden__projects", "show__projects");
    portfolioContainer.style.maxHeight = altura + 40 + "px";
    portfolioContainer.parentNode.lastElementChild.childNodes[0].nodeValue =
      "Ver Menos";
  } else {
    portfolioContainer.classList.replace("show__projects", "hidden__projects");
    portfolioContainer.style.maxHeight = "700px";
    portfolioContainer.parentNode.lastElementChild.childNodes[0].nodeValue =
      "Ver Más";
  }
  showDegradiant.classList.toggle("fadeout");
});

let pointer = document.querySelector(".cursor");
window.addEventListener("load", function () {
  let userAgent = window.navigator.userAgent;

  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    document.addEventListener("mousemove", (e) => {
      pointer.style.left = e.clientX + "px";
      pointer.style.top = e.clientY + "px";
    });
  }
});

let showText = document.querySelectorAll(".viewMore");

showText.forEach((Text) => {
  Text.addEventListener("click", function (e) {
    let elementParent = e.target.classList.contains("viewMore")
      ? e.target
      : e.target.parentElement;
    let [, separator, span] = elementParent.parentNode.childNodes;
    let downArrowicon =
      elementParent.lastElementChild.classList.contains("bx-chevron-down");

    separator.classList.toggle("showSeparator");
    span.classList.toggle("showText");

    if (downArrowicon) {
      elementParent.childNodes[0].nodeValue = "Mostrar Menos";
      elementParent.lastElementChild.classList.replace(
        "bx-chevron-down",
        "bx-chevron-up"
      );
    } else {
      elementParent.lastElementChild.classList.replace(
        "bx-chevron-up",
        "bx-chevron-down"
      );
      elementParent.childNodes[0].nodeValue = "Mostrar Más";
    }
  });
});

let check = document.querySelector("#btn-switch");

check.addEventListener("click", () => {
  let id = check.checked;
  if (id === true) {
    location.href = "en/index.html";
  } else {
    location.href = "../index.html";
  }
});

let projects = document.querySelectorAll(".featured__item");

let a = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace("project-hidden", "project-active");
      } else {
        entry.target.classList.replace("project-active", "project-hidden");
      }
    });
  },
  { rootMargin: "0px -60% 0px -40%" }
);

projects.forEach((projects) => {
  a.observe(projects);
});
