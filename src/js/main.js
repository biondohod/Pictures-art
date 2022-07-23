import modal from './modules/modal';
import slider from './modules/slider';
import formsFunction from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
  modal('.popup-design', '.popup-close', '.button-design', {
    isDestroyTrigger: false,
    timer: false,
    isOpenByScroll: false,
  });
  modal('.popup-consultation', '.popup-close', '.button-consultation', {
    isDestroyTrigger: false,
    timer: 60,
    isOpenByScroll: false,
  });
  modal('.popup-gift', '.popup-close', '.fixed-gift', {
    isDestroyTrigger: true,
    timer: false,
    isOpenByScroll: true,
  });

  slider('.feedback-slider-item', 'horizontal', 1, 3000, '.main-prev-btn', '.main-next-btn');
  slider('.main-slider-item', 'vertical', 1, 3000);

  formsFunction();
});
