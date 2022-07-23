let isOpen = false;
let buttonPressed = false;
const modal = (modalSelector, closeBtnSelector, triggerSelector, { isDestroyTrigger = false, timer = false, isOpenByScroll = false }) => {
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

  class Modal {
    constructor(modalWindow, closeBtn, trigger, isDestroyTriggerBtn) {
      this._isDestroyTrigger = isDestroyTriggerBtn;

      this._modalClass = modalWindow.slice(1);
      this._modal = document.querySelector(modalWindow);
      this._modal.classList.add('animated', 'fadeIn');
      this._modal.addEventListener('click', (evt) => this.closeModalLBySubstrate(evt));

      this._openButtons = document.querySelectorAll(trigger);
      this._openButtons.forEach((button) => {
        button.addEventListener('click', (evt) => this.openModal(evt));
      });

      this._modal.querySelector(closeBtn).addEventListener('click', () => this.closeModal());
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
  const newModal = new Modal(modalSelector, closeBtnSelector, triggerSelector, isDestroyTrigger);
  if (timer) {
    newModal.addTimer(timer);
  }
  if (isOpenByScroll) {
    newModal.addOpenModalByScroll();
  }
};

export default modal;
