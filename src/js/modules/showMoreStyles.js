import { getResource } from '../services/requests';

const showMoreStyles = (triggerSelector, wrapperSelector) => {
  const btn = document.querySelector(triggerSelector);
  const stylesWrapper = document.querySelector(wrapperSelector);

  const createStyles = (res) => {
    res.forEach(({ src, title, link }) => {
      const card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt>
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;
      stylesWrapper.append(card);
    });
  };

  const showError = (text, timer) => {
    const message = document.createElement('div');
    message.classList.add('status-message', 'animated', 'fadeInUp');
    message.innerHTML = `
      <img src="assets/img/failure.png" style="width: 60px;">
      <div>${text}</div>
    `;
    stylesWrapper.append(message);
    setTimeout(() => {
      message.classList.remove('fadeInUp');
      message.classList.add('fadeOutUp');
      setTimeout(() => {
        message.remove();
      }, 700);
    }, timer);
  };

  btn.addEventListener('click', () => {
    btn.disabled = true;
    getResource('http://localhost:3000/styles')
      .then((res) => {
        createStyles(res);
        btn.remove();
      })
      .catch(() => {
        btn.disabled = false;
        showError('Что-то пошло не так. Проверьте соединение с интернетом либо повторите попытку позднее', 3000);
      });
  });
};

export default showMoreStyles;
