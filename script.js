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

// Mouse pointer effect with colorful smoke
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  
  cursorDot.className = 'cursor-dot';
  cursorOutline.className = 'cursor-dot-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  let cursorVisible = true;
  let cursorEnlarged = false;
  
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#ffeead', '#ff9999', '#99ccff', '#ff99cc'
  ];
  
  function createSmokeParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'smoke-trail';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
  
  let lastX = 0;
  let lastY = 0;
  let throttleTimer;
  
  function mousemoveHandler(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    cursorDot.style.left = x + 'px';
    cursorDot.style.top = y + 'px';
    cursorOutline.style.left = x + 'px';
    cursorOutline.style.top = y + 'px';
    
    // Create smoke effect with throttling
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        const distance = Math.sqrt(
          Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)
        );
        
        if (distance > 5) {
          createSmokeParticle(x, y);
          lastX = x;
          lastY = y;
        }
        
        throttleTimer = null;
      }, 50);
    }
  }
  
  function mouseenterHandler() {
    cursorVisible = true;
    cursorDot.style.opacity = 1;
    cursorOutline.style.opacity = 1;
  }
  
  function mouseleaveHandler() {
    cursorVisible = false;
    cursorDot.style.opacity = 0;
    cursorOutline.style.opacity = 0;
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
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseout', () => {
      cursorEnlarged = false;
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
});

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