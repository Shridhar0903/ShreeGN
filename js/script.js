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
