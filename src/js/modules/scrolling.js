const scrolling = (upSelector, triggerHeight) => {
  const upBtn = document.querySelector(upSelector);
  upBtn.classList.add('animated');

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > triggerHeight) {
      upBtn.classList.remove('fadeOut');
      upBtn.classList.add('fadeIn');
    } else {
      upBtn.classList.remove('fadeIn');
      upBtn.classList.add('fadeOut');
    }
  });

  const speed = 0.2;
  const links = document.querySelectorAll('[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();

      const widthTop = document.documentElement.scrollTop;
      const hash = this.hash;
      const toBlock = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      function step(time) {
        if (!start) {
          start = time;
        }
        const progress = time - start;
        const pixelLeft = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

        document.documentElement.scrollTo(0, pixelLeft);

        if (pixelLeft !== widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }

      requestAnimationFrame(step);
    });
  });
};

export default scrolling;
