const slider = (slidesSelector, direction, start, intervalDuration, prevbtnSelector, nextBtnSelector) => {
  const slides = document.querySelectorAll(slidesSelector);
  let slideIndex = start - 1;

  const showSlide = () => {
    slides.forEach((item, i) => {
      if (i === slideIndex) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };
  showSlide(slideIndex);

  const selectSlide = (num, animationIn, animationOut, oldAnimIn, oldAnimOut) => {
    slides[slideIndex].classList.remove(oldAnimOut);
    slides[slideIndex].classList.add(animationOut);
    setTimeout(() => {
      slideIndex += num;
      if (slideIndex > slides.length - 1) {
        slideIndex = 0;
      } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
      slides[slideIndex].classList.remove(animationOut, oldAnimOut, oldAnimIn);
      slides[slideIndex].classList.add(animationIn);
      showSlide();
    }, 700);
  };

  try {
    const prev = document.querySelector(prevbtnSelector);
    const next = document.querySelector(nextBtnSelector);
    prev.addEventListener('click', () => selectSlide(-1, 'fadeInLeft', 'fadeOutRight', 'fadeInRight', 'fadeOutLeft'));
    next.addEventListener('click', () => selectSlide(1, 'fadeInRight', 'fadeOutLeft', 'fadeInLeft', 'fadeOutRight'));
  // eslint-disable-next-line no-empty
  } catch (e) {}

  slides.forEach((slide) => slide.classList.add('animated'));
  let intervalId;
  const setAnimation = () => {
    if (intervalDuration) {
      if (direction === 'vertical') {
        intervalId = setInterval(() => {
          selectSlide(1, 'fadeInUp', 'fadeOutUp');
        }, intervalDuration + 1400);
      } else {
        intervalId = setInterval(() => {
          selectSlide(1, 'fadeInRight', 'fadeOutLeft', 'fadeInLeft', 'fadeOutRight');
        }, intervalDuration + 1400);
      }
    }
  };
  setAnimation();

  const sliderWrapper = slides[0].parentNode;
  sliderWrapper.addEventListener('mouseenter', () => clearInterval(intervalId));
  sliderWrapper.addEventListener('mouseleave', setAnimation);
};

export default slider;
