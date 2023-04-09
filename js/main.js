let searchBtn = document.querySelector(".searchBtn");
let closeBtn = document.querySelector(".closeBtn");
let searchBox = document.querySelector(".searchBox");
let navigation = document.querySelector(".navigation");
let menuToggle = document.querySelector(".menuToggle");
let header = document.querySelector(".header");

searchBtn.onclick = function () {
    searchBox.classList.add("active");
    closeBtn.classList.add("active");
    searchBtn.classList.add("active");
    menuToggle.classList.add("hide");
    header.classList.remove("open");
};

closeBtn.onclick = function () {
    searchBox.classList.remove("active");
    closeBtn.classList.remove("active");
    searchBtn.classList.remove("active");
    menuToggle.classList.remove("hide");
};
menuToggle.onclick = function () {
    header.classList.toggle("open");
    closeBtn.classList.remove("active");
    searchBtn.classList.remove("active");
    menuToggle.classList.remove("hide");
};

//      perfil
const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu-dashboard");
const iconoMenu = toggle.querySelector("i");
const enlacesMenu = document.querySelectorAll(".enlace");

toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open");

    if (iconoMenu.classList.contains("bx-menu")) {
        iconoMenu.classList.replace("bx-menu", "bx-x");
    } else {
        iconoMenu.classList.replace("bx-x", "bx-menu");
    }
});

enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open");
        iconoMenu.classList.replace("bx-menu", "bx-x");
    });
});
