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

// Mouse pointer effect
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  
  cursorDot.className = 'cursor-dot';
  cursorOutline.className = 'cursor-dot-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  let cursorVisible = true;
  let cursorEnlarged = false;
  
  const endX = window.innerWidth / 2;
  const endY = window.innerHeight / 2;
  
  let distanceX = 0;
  let distanceY = 0;
  
  let mouseX = endX;
  let mouseY = endY;
  
  function toggleCursorVisibility() {
    if (cursorVisible) {
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
    } else {
      cursorDot.style.opacity = 0;
      cursorOutline.style.opacity = 0;
    }
  }
  
  function toggleCursorSize() {
    if (cursorEnlarged) {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }
  
  function mousemoveHandler(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    cursorOutline.style.left = mouseX + 'px';
    cursorOutline.style.top = mouseY + 'px';
  }
  
  function mouseenterHandler() {
    cursorVisible = true;
    toggleCursorVisibility();
  }
  
  function mouseleaveHandler() {
    cursorVisible = false;
    toggleCursorVisibility();
  }
  
  document.addEventListener('mousemove', mousemoveHandler);
  document.addEventListener('mouseenter', mouseenterHandler);
  document.addEventListener('mouseleave', mouseleaveHandler);
  
  const clickables = document.querySelectorAll(
    'a, button, .btn, input[type="submit"], .clickable'
  );
  
  clickables.forEach((el) => {
    el.addEventListener('mouseover', () => {
      cursorEnlarged = true;
      toggleCursorSize();
    });
    
    el.addEventListener('mouseout', () => {
      cursorEnlarged = false;
      toggleCursorSize();
    });
  });
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