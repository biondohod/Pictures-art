const checkTextInputs = (selector) => {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-яё 0-9!?:-]/ig, '');
    });
  });
};

export default checkTextInputs;
