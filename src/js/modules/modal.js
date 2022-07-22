const calcScrollWidth = () => {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const scrollWidth = calcScrollWidth();

let isOpen = false;
let buttonPressed = false;
class Modal {
  constructor(modalSelector, closeBtnSelector, triggerSelector, isDestroyTrigger = false) {
    this._isDestroyTrigger = isDestroyTrigger;

    this._modalClass = modalSelector.slice(1);
    this._modal = document.querySelector(modalSelector);
    this._modal.classList.add('animated', 'fadeIn');
    this._modal.addEventListener('click', (evt) => this.closeModalLBySubstrate(evt));

    this._openButtons = document.querySelectorAll(triggerSelector);
    this._openButtons.forEach((button) => {
      button.addEventListener('click', (evt) => this.openModal(evt));
    });

    this._modal.querySelector(closeBtnSelector).addEventListener('click', () => this.closeModal());
  }

  openModal(evt) {
    if (!isOpen) {
      if (evt) {
        evt.preventDefault();
      }
      this._modal.classList.add('show');
      document.body.classList.add('open-modal');
      document.body.style.marginRight = `${scrollWidth}px`;
      isOpen = true;
      if (this._isDestroyTrigger) {
        this._openButtons.forEach((btn) => btn.remove());
      }
      buttonPressed = true;
    }
  }

  addOpenModalByScroll() {
    window.addEventListener('scroll', () => {
      if (!buttonPressed && (window.pageYOffset + document.documentElement.clientHeight
        >= document.documentElement.scrollHeight)) {
        this.openModal();
      }
    });
  }

  closeModal() {
    this._modal.classList.remove('show');
    document.body.classList.remove('open-modal');
    document.body.style.marginRight = '0px';
    isOpen = false;
  }

  closeModalLBySubstrate(evt) {
    if (evt.target.classList.contains(this._modalClass)) {
      this.closeModal();
    }
  }

  addTimer(seconds) {
    setTimeout(() => {
      this.openModal();
    }, seconds * 1000);
  }
}

// eslint-disable-next-line no-new
new Modal('.popup-design', '.popup-close', '.button-design');
// eslint-disable-next-line no-new
new Modal('.popup-consultation', '.popup-close', '.button-consultation').addTimer(60);
// eslint-disable-next-line no-new
new Modal('.popup-gift', '.popup-close', '.fixed-gift', true).addOpenModalByScroll();
