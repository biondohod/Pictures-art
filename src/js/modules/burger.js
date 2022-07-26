const burger = (menuSelector, triggerSelector) => {
  const btn = document.querySelector(triggerSelector);
  const menu = document.querySelector(menuSelector);
  menu.classList.add('animated');

  const openBurgerMenu = () => {
    if (!menu.classList.contains('show')) {
      menu.classList.remove('flipOutX');
      menu.classList.add('flipInX');
      menu.classList.add('show');
    } else {
      menu.classList.remove('flipInX');
      menu.classList.add('flipOutX');
      setTimeout(() => { menu.classList.remove('show'); }, 700);
    }
  };

  const toggleBurgerState = () => {
    if (window.screen.availWidth > 993) {
      menu.classList.remove('flipInX');
      menu.classList.add('flipOutX');
      setTimeout(() => { menu.classList.remove('show'); }, 700);
      btn.querySelector('img').style.display = 'none';
      btn.removeEventListener('click', openBurgerMenu);
    } else {
      btn.querySelector('img').style = '';
      btn.addEventListener('click', openBurgerMenu);
    }
  };
  toggleBurgerState();
  window.addEventListener('resize', toggleBurgerState);
};

export default burger;
