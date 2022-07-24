import { getResource } from '../services/requests';

const calc = (sizeSelector, materialSelector, optionsSelector, promocodeSelector, priceSelector) => {
  const price = document.querySelector(priceSelector);

  let onceAnimation = true;
  const showError = (text) => {
    const message = document.createElement('div');
    message.classList.add('status-message');
    if (onceAnimation) {
      message.classList.add('animated', 'fadeInUp');
      onceAnimation = false;
    }
    message.innerHTML = `
      <img src="assets/img/failure.png" style="width: 60px;">
      <div>${text}</div>
    `;
    price.textContent = '';
    price.append(message);
  };

  let sum = 0;
  let sizePrice = 0;
  let materialPrice = 0;
  let optionsPrice = 0;
  let promocode = false;

  const calcSum = (select) => {
    const selectId = select.id;
    let selectContent;
    try {
      selectContent = select[select.selectedIndex].textContent;
    // eslint-disable-next-line no-empty
    } catch (e) {}
    getResource('http://localhost:3000/price')
      .then((data) => {
        let res;
        try {
          res = data[selectId][selectContent];
        // eslint-disable-next-line no-empty
        } catch (e) {}
        switch (selectId) {
          case 'size':
            sizePrice = res;
            break;
          case 'material':
            materialPrice = res;
            break;
          case 'options':
            optionsPrice = res;
            break;
          default:
            if (select.value === 'IWANTPOPART') {
              promocode = true;
            } else {
              promocode = false;
            }
            break;
        }
        sum = (sizePrice * materialPrice) + optionsPrice;
      })
      .then(() => {
        if (!sum) {
          price.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
        } else if (promocode) {
          sum *= 0.7;
          price.textContent = `Промокод применен! Скидка составит 30% и теперь ваш портрет будет стоить ${sum} рублей`;
        } else {
          price.textContent = `Ваш портрет будет стоить ${sum} рублей`;
        }
      })
      .catch(() => showError('При расчете суммы что-то пошло не так, проверьте соедниение с интернетом или повторите попытку позднее'));
  };
  document.querySelector(sizeSelector).addEventListener('change', (evt) => calcSum(evt.target));
  document.querySelector(materialSelector).addEventListener('change', (evt) => calcSum(evt.target));
  document.querySelector(optionsSelector).addEventListener('change', (evt) => calcSum(evt.target));
  document.querySelector(promocodeSelector).addEventListener('input', (evt) => calcSum(evt.target));
};

export default calc;
