// === Typewriter Effect ===
const typedText = document.getElementById('typed-text');

const lines = [
  "Making beautiful Interfaces",
  "Creating Awesome Designs",
  "Creating User Centric Experiences"
];

let currentLine = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
  let line = lines[currentLine];
  let display = isDeleting
    ? line.substring(0, currentChar--)
    : line.substring(0, currentChar++);

  typedText.innerHTML = display;

  if (!isDeleting && currentChar === line.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentLine = (currentLine + 1) % lines.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
}

typeEffect();

// === Locomotive Scroll ===
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});





const btns = document.querySelectorAll(".btn");
const slideRow = document.getElementById("slide-row");
const main = document.querySelector("main");

let currentIndex = 0;

function updateSlide() {
  const mainWidth = main.offsetWidth;
  const translateValue = currentIndex * -mainWidth;
  slideRow.style.transform = `translateX(${translateValue}px)`;

  btns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentIndex);
  });
}

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentIndex = index;
    updateSlide();
  });
});

window.addEventListener("resize", () => {
  updateSlide();
});

