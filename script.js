// TextScramble class for glitch effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end, char: null });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Enhanced Matrix Rain Effect
function createMatrixRain() {
  const matrixBg = document.getElementById("matrix-bg");
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン♔♕♖♗♘♙♚♛♜♝♞♟";
  const columns = Math.floor(window.innerWidth / 20);

  // Clear existing rain elements
  matrixBg.innerHTML = "";

  // Create columns for better performance
  for (let i = 0; i < columns; i++) {
    const rain = document.createElement("div");
    rain.className = "matrix-rain";
    rain.style.left = i * 20 + "px";
    rain.style.animationDuration = Math.random() * 2 + 1 + "s";
    rain.style.animationDelay = Math.random() * 2 + "s";

    // Add random color variations
    const hue = Math.random() * 40 - 20; // Slight color variation
    rain.style.filter = `hue-rotate(${hue}deg) brightness(${
      Math.random() * 0.3 + 0.7
    })`;

    let text = "";
    const length = Math.floor(Math.random() * 25) + 15;
    for (let j = 0; j < length; j++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    rain.textContent = text;

    matrixBg.appendChild(rain);
  }
}

// Recreate matrix rain on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createMatrixRain, 300);
});

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Fade In Animation on Scroll
function initFadeInAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbarEffect() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 255, 65, 0.1)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)";
      navbar.style.boxShadow = "none";
    }
  });
}

// Image Hover Effects
function initImageEffects() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.filter = "brightness(1.1) contrast(1.1) saturate(1.2)";
    });

    img.addEventListener("mouseleave", function () {
      this.style.filter = "brightness(1) contrast(1) saturate(1)";
    });
  });
}

// Service Cards Animation
function initServiceCards() {
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card, index) => {
    card.style.animationDelay = index * 0.1 + "s";

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Parallax Effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-content");

    parallaxElements.forEach((el) => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Add dynamic glow effect to elements
function addGlowEffect() {
  const glowElements = document.querySelectorAll(
    ".logo, .section-title, .cta-button"
  );

  glowElements.forEach((el) => {
    setInterval(() => {
      el.style.textShadow = `0 0 ${
        Math.random() * 20 + 10
      }px var(--primary-green)`;
    }, 2000);
  });
}

// Initialize text scramble effect
document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Welcome to Our Company",
    "Innovation Meets Excellence",
    "Building the Future",
    "Creating Solutions",
  ];
  const el = document.querySelector(".text-scramble");
  if (el) {
    const fx = new TextScramble(el);
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
  }
});

// Form submission handler
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Create email body with formatted content
      const emailBody = `
Nama: ${name}
Email: ${email}
Telepon: ${phone}
Layanan: ${subject}

Pesan:
${message}
      `.trim();

      // Create mailto link with all form data
      const mailtoLink = `mailto:ferryardiansyahh04@gmail.com?subject=Order Layanan: ${subject}&body=${encodeURIComponent(
        emailBody
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form
      form.reset();
    });
  }
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  createMatrixRain();
  initSmoothScrolling();
  initFadeInAnimation();
  initNavbarEffect();
  initImageEffects();
  initServiceCards();
  initParallax();
  initContactForm();
});

// Add loading screen effect
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Initialize glow effect after page loads
setTimeout(addGlowEffect, 1000);
