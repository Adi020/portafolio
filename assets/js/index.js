
//aqui
document.addEventListener("DOMContentLoaded", function () {
  // Declaración de variables
  const headerMenu = document.querySelector(".header__menu");
  const form = document.getElementById("form");
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".list__link");
  const portfolioContainer = document.querySelector(".portfolio__content");
  const showProjects = document.querySelector(".portfolio__show");
  const pointer = document.querySelector(".cursor");
  const showText = document.querySelectorAll(".viewMore");
  const check = document.querySelector("#btn-switch");
  const projects = document.querySelectorAll(".featured__item");

  // Eventos de escucha
  document.addEventListener("click", handleClick);
  window.addEventListener("scroll", handleScroll);
  form.addEventListener("submit", handleSubmit);
  showProjects.addEventListener("click", handleShowProjects);
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
    document.addEventListener("mousemove", handleMouseMove);
  }
  showText.forEach((text) => text.addEventListener("click", handleShowText));
  check.addEventListener("click", handleSwitch);
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

  // Observadores de intersección
  const observer = new IntersectionObserver(handleIntersection, { rootMargin: "-60% 0px -40% 0px" });
  sections.forEach((section) => observer.observe(section));
  const projectObserver = new IntersectionObserver(handleProjectIntersection, { rootMargin: "0px -60% 0px -40%" });
  projects.forEach((project) => projectObserver.observe(project));

  // Funciones de eventos
  function handleClick(e) {
    if (e.target.closest(".header__btn")) {
      headerMenu.classList.toggle("show__menu");
    } else if (headerMenu.classList.contains("show__menu")) {
      headerMenu.classList.remove("show__menu");
    }
  }

  function handleScroll() {
    if (headerMenu.classList.contains("show__menu")) {
      headerMenu.classList.remove("show__menu");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this);
    // Procesar el formulario
  }

  function handleShowProjects() {
    const altura = portfolioContainer.scrollHeight;
    if (portfolioContainer.classList.contains("hidden__projects")) {
      portfolioContainer.classList.replace("hidden__projects", "show__projects");
      portfolioContainer.style.maxHeight = altura + 40 + "px";
      portfolioContainer.parentNode.lastElementChild.childNodes[0].nodeValue =  check.checked ? "See Lees" : "Ver Menos;
    } else {
      portfolioContainer.classList.replace("show__projects", "hidden__projects");
      portfolioContainer.style.maxHeight = "700px";
      portfolioContainer.parentNode.lastElementChild.childNodes[0].nodeValue = check.checked ? "See More" : "Ver Más;
    }
    showDegradiant.classList.toggle("fadeout");
  }

  function handleMouseMove(e) {
    pointer.style.left = e.clientX + "px";
    pointer.style.top = e.clientY + "px";
  }

  function handleShowText(e) {
    const elementParent = e.target.classList.contains("viewMore") ? e.target : e.target.parentElement;
    const [, separator, span] = elementParent.parentNode.childNodes;
    const downArrowicon = elementParent.lastElementChild.classList.contains("bx-chevron-down");
    separator.classList.toggle("showSeparator");
    span.classList.toggle("showText");
    if (downArrowicon) {
      elementParent.childNodes[0].nodeValue = check.checked ? "See Lees" : "Ver Menos;
      elementParent.lastElementChild.classList.replace("bx-chevron-down", "bx-chevron-up");
    } else {
      elementParent.lastElementChild.classList.replace("bx-chevron-up", "bx-chevron-down");
      elementParent.childNodes[0].nodeValue =check.checked ? "See More" : "Ver Más;
    }
  }

  function handleSwitch() {
    const id = check.checked;
    location.href = id === true ? "en/index.html" : "../index.html";
  }

  // Funciones de observadores de intersección
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.remove("active"));
        document.querySelector(`header nav a.list__link[href="#${entry.target.id}"]`).classList.add("active");
        history.pushState(null, "", `#${entry.target.id}`);
        entry.target.classList.replace("hidden-animate", "show-animate");
      } else {
        entry.target.classList.replace("show-animate", "hidden-animate");
      }
    });
  }

  function handleProjectIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.replace("project-hidden", "project-active");
      } else {
        entry.target.classList.replace("project-active", "project-hidden");
      }
    });
  }
});
