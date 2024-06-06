const SCROLL_OFFSET = 40;

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  document
    .querySelectorAll(".js-scroll")
    .forEach((el) => {
      if (elementInView(el, SCROLL_OFFSET)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    })
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});