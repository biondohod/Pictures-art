import scrollProgress from './modules/scrollProgress';
import modal from './modules/modal';
import slider from './modules/slider';
import formsFunction from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import tabs from './modules/tabs';
import pictires from './modules/pictures';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', () => {
  scrollProgress();

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
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');

  showMoreStyles('.button-styles', '#styles .row');

  calc('#size', '#material', '#options', '.promocode', '.calc-price');

  tabs('.portfolio-menu > li', '.portfolio-block', 'active', '.portfolio-no');

  pictires('.sizes-block');

  accordion('.accordion-heading', '.accordion-block');

  burger('.burger-menu', '.burger');

  scrolling('.pageup', 1645);

  drop();
});
