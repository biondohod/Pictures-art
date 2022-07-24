const accordion = (triggerSelector, contentSelector) => {
  const triggers = document.querySelectorAll(triggerSelector);
  const content = document.querySelectorAll(contentSelector);

  // Аккордеон с js анимацией растягивание/схлопывание элемента
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      trigger.classList.toggle('accordion-heading-active');
      content[index].classList.toggle('active-content');
      if (trigger.classList.contains('accordion-heading-active')) {
        content[index].style.maxHeight = `${content[index].scrollHeight + 80}px`;
      } else {
        content[index].style.maxHeight = 0;
      }
    });
  });
  // Аккордеон с css анимациями flipInX flipOutX
  // const hideContent = () => {
  //   content.forEach((item) => {
  //     item.style.display = 'none';
  //     item.classList.add('animated');
  //   });
  // };
  // hideContent();

  // triggers.forEach((trigger, index) => {
  //   trigger.addEventListener('click', () => {
  //     if (trigger.classList.contains('accordion-heading-active')) {
  //       content[index].classList.remove('flipInX');
  //       content[index].classList.add('flipOutX');
  //       setTimeout(() => {
  //         content[index].classList.remove('show');
  //       }, 700);
  //     } else {
  //       content[index].classList.remove('flipOutX');
  //       content[index].classList.add('flipInX');
  //       content[index].classList.add('show');
  //     }
  //     trigger.classList.toggle('accordion-heading-active');
  //   });
  // });
};

export default accordion;
