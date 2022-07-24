import { postData } from '../services/requests';

const formsFunction = () => {
  const forms = document.querySelectorAll('form');
  const uploads = document.querySelectorAll('[name="upload"]');
  uploads.forEach((upload) => {
    upload.addEventListener('input', () => {
      const image = upload.files[0];
      const name = image.name.split('.');
      let imageName = image.name;
      if (name[0].length >= 10) {
        name[0] = name[0].slice(0, 11);
        imageName = name.join('...');
      }
      upload.previousElementSibling.textContent = imageName;
    });
  });

  const messages = {
    loading: {
      text: 'Отправка...',
      image: 'assets/img/spinner.svg',
    },
    success: {
      text: 'Спасибо! Скоро мы с вами свяжемся',
      image: 'assets/img/success.png',
    },
    failure: {
      text: 'Что-то пошло не так. Проверьте соединение с интернетом либо повторите попытку позднее',
      image: 'assets/img/failure.png',
    },
  };

  const message = document.createElement('div');
  message.classList.add('status-message');

  const messageImg = document.createElement('img');
  messageImg.style.width = '60px';
  message.append(messageImg);

  const messageText = document.createElement('div');
  message.append(messageText);
  const setMessage = (form, { text, image }) => {
    message.style.display = 'block';
    messageImg.src = image;
    messageText.textContent = text;
    form.classList.add('animated', 'fadeOutUp');
    setTimeout(() => {
      form.style.display = 'none';
      form.parentNode.append(message);
      message.classList.remove('fadeOutUp');
      message.classList.add('animated', 'fadeInUp');
    }, 700);
  };

  const changeMessage = ({ text, image }) => {
    message.classList.remove('fadeInUp');
    message.classList.add('fadeOutUp');
    setTimeout(() => {
      messageImg.src = image;
      messageText.textContent = text;
      message.classList.remove('fadeOutUp');
      message.classList.add('fadeInUp');
    }, 700);
  };

  const removeMessage = (form, time) => {
    setTimeout(() => {
      message.classList.remove('fadeInUp');
      message.classList.add('fadeOutUp');
      setTimeout(() => {
        message.style.display = 'none';
        form.style.display = 'block';
        form.classList.remove('fadeOutUp');
        form.classList.add('fadeInUp');
      }, 700);
    }, time);
  };

  let path;
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (form.closest('.popup-design') || form.classList.contains('form-calc')) {
        path = 'assets/server.php';
      } else {
        path = 'assets/consultation.php';
      }
      setMessage(form, messages.loading);
      const formData = new FormData(form);
      postData(path, formData)
        .then((data) => {
          if (!data.ok) {
            postData.reject();
          }
          changeMessage(messages.success);
          form.reset();
          uploads.forEach((upload) => {
            upload.previousElementSibling.textContent = 'Файл не выбран';
          });
        })
        .catch(() => {
          changeMessage(messages.failure);
        })
        .finally(() => {
          removeMessage(form, 4000);
        });
    });
  });
};

export default formsFunction;
