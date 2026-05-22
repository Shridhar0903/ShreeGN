// =============Scroll-navbar=======================

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  // If the window is scrolled down more than 20 pixels, inject the glassmorphic style class
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const wrapper = document.querySelector(".products-scroll-wrapper");
const track = document.querySelector(".horizontal-scroll-track");
const cards = document.querySelectorAll(".product-3d-card");

window.addEventListener("scroll", () => {
  if (!wrapper || !track || window.innerWidth <= 1024) return;

  const wrapperTop = wrapper.offsetTop;
  const wrapperHeight = wrapper.offsetHeight;
  const viewportHeight = window.innerHeight;

  const scrollDistance = window.scrollY - wrapperTop;
  const maxScroll = wrapperHeight - viewportHeight;

  if (scrollDistance >= 0 && scrollDistance <= maxScroll) {
    const progress = scrollDistance / maxScroll;

    // Fixed formula calculates the exact remaining distance to slide
    const maxTranslate =
      track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;
    track.style.transform = `translateX(-${progress * maxTranslate}px)`;

    // Focus states map perfectly to the left active region of the layout viewport
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardLeft = cardRect.left;

      if (cardLeft > 0 && cardLeft < window.innerWidth * 0.4) {
        cards.forEach((c) => c.classList.remove("active-focus"));
        card.classList.add("active-focus");
      }
    });
  }
});

// mobiile menu
document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const navBackdrop = document.getElementById("navBackdrop");
  const navLinks = document.querySelectorAll(".nav-link");

  // Unified helper function to change class states cleanly
  const toggleNavigation = () => {
    menuToggleBtn.classList.toggle("open-active");
    mobileNavMenu.classList.toggle("menu-open");
    navBackdrop.classList.toggle("active-view");

    // Prevent background body scroll layer when navigation menu is visible
    if (mobileNavMenu.classList.contains("menu-open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Click hooks for menu toggle trigger button and gray background overlay area
  menuToggleBtn.addEventListener("click", toggleNavigation);
  navBackdrop.addEventListener("click", toggleNavigation);

  // Auto-close navigation panel drawer instantly when clicking any links lane route target
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavMenu.classList.contains("menu-open")) {
        toggleNavigation();
      }
    });
  });
});
