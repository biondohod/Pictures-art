const pictires = (blockSelector) => {
  const blocks = document.querySelectorAll(blockSelector);

  const showImg = (block) => {
    const img = block.querySelector('img');
    img.src = `${img.src.slice(0, -4)}-1.png`;
    img.classList.add('animated', 'fadeIn');
    const textElements = block.querySelectorAll('p:not(.sizes-hit)');
    textElements.forEach((text) => {
      text.style.display = 'none';
    });
  };

  const hideImg = (block) => {
    const img = block.querySelector('img');
    img.src = `${img.src.slice(0, -6)}.png`;
    img.classList.remove('animated', 'fadeIn');
    const textElements = block.querySelectorAll('p');
    textElements.forEach((text) => {
      if (!text.classList.contains('sizes-hit')) {
        text.style.display = 'block';
      }
    });
  };

  blocks.forEach((block) => {
    block.addEventListener('mouseover', () => showImg(block));
    block.addEventListener('mouseout', () => hideImg(block));
  });
};

export default pictires;
