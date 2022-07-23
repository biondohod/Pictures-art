const scrollProgress = () => {
  const scrollWrapper = document.createElement('div');
  scrollWrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 10px;
    background-color: rgba(0, 0, 0, 0);
  `;
  const progress = document.createElement('div');
  progress.classList.add('fff');
  progress.style.cssText = `
    height: 100%;
    width: 0;
    background: rgb(174,209,228);
    background: linear-gradient(90deg, rgba(174,209,228,1) 0%, rgba(166,39,179,1) 35%, rgba(97,9,121,1) 100%);
    transition: 0.2s all;

  `;
  scrollWrapper.append(progress);
  document.body.append(scrollWrapper);
  const clientWidthPercent = Math.round((document.documentElement.clientWidth) / 100);
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.ceil((window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100);
    progress.style.width = `${clientWidthPercent * scrollPercent}px`;
  });
};

export default scrollProgress;
