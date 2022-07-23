const mask = (selector) => {
  function createMask() {
    const matrix = '+_ (___) ___-__-__';
    let i = 0;
    const def = matrix.replace(/\D/g, '');

    let val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, (a) => {
      if (/[_\d]/.test(a) && i < val.length) {
        return val[i++];
      } if (i >= val.length) {
        return '';
      }
      return a;
    });
  }

  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.addEventListener('input', createMask);
  });
};

export default mask;
