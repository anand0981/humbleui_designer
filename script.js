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

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
