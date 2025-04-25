// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Set initial theme based on system preference or stored preference
function setInitialTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    body.dataset.theme = storedTheme;
    updateThemeIcon(storedTheme);
  } else if (prefersDarkScheme.matches) {
    body.dataset.theme = "dark";
    updateThemeIcon("dark");
  } else {
    body.dataset.theme = "light";
    updateThemeIcon("light");
  }
}

// Update theme icon
function updateThemeIcon(theme) {
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
}

// Set initial theme
setInitialTheme();

// Listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setInitialTheme();
  }
});

// Theme toggle click handler
themeToggle.addEventListener("click", () => {
  const currentTheme = body.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.dataset.theme = newTheme;
  updateThemeIcon(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Menu Tabs
const menuTabs = document.querySelectorAll(".menu-tab");
const menuCategories = document.querySelectorAll(".menu-category");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and categories
    menuTabs.forEach((t) => t.classList.remove("active"));
    menuCategories.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab and corresponding category
    tab.classList.add("active");
    document
      .querySelector(`.menu-category[data-category="${tab.dataset.category}"]`)
      .classList.add("active");
  });
});

// Gallery Lightbox
lightGallery(document.getElementById("lightgallery"), {
  speed: 500,
  download: false,
});

// Date and Time Picker
flatpickr("#date", {
  minDate: "today",
  dateFormat: "Y-m-d",
});

flatpickr("#time", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",
  minTime: "11:00",
  maxTime: "22:00",
});

// Testimonials Carousel
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const prevButton = document.querySelector(".prev-slide");
const nextButton = document.querySelector(".next-slide");
let currentSlide = 0;

function showSlide(index) {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));

  if (index >= testimonialSlides.length) currentSlide = 0;
  if (index < 0) currentSlide = testimonialSlides.length - 1;

  testimonialSlides[currentSlide].classList.add("active");
}

prevButton.addEventListener("click", () => {
  currentSlide--;
  showSlide(currentSlide);
});

nextButton.addEventListener("click", () => {
  currentSlide++;
  showSlide(currentSlide);
});

// Auto-advance testimonials
setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 5000);

// Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document
  .querySelectorAll(".menu-item, .about-images img, .info-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "none";
  } else {
    navbar.style.boxShadow = "0 2px 20px var(--shadow-color)";
  }

  lastScroll = currentScroll;
});
