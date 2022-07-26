const drop = () => {
  const uploads = document.querySelectorAll('[name="upload"]');

  const highlitUploads = (upload) => {
    const div = upload.closest('.file_upload');
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    div.style.outline = '3px solid bisque';
  };

  const unhighlitUploads = (upload) => {
    const div = upload.closest('.file_upload');
    div.style = '';
  };
  uploads.forEach((upload) => {
    upload.addEventListener('dragenter', (evt) => {
      evt.preventDefault();
      highlitUploads(upload);
    });

    upload.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      highlitUploads(upload);
    });

    upload.addEventListener('dragleave', (evt) => {
      evt.preventDefault();
      unhighlitUploads(upload);
    });
    upload.addEventListener('drop', (evt) => {
      evt.preventDefault();
      upload.files = evt.dataTransfer.files;
      const image = upload.files[0];
      const name = image.name.split('.');
      let imageName = image.name;
      if (name[0].length >= 10) {
        name[0] = name[0].slice(0, 11);
        imageName = name.join('...');
      }
      upload.previousElementSibling.textContent = imageName;
      unhighlitUploads(upload);
    });
  });
};

export default drop;
