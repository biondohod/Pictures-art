const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  });
  return res;
};

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    res.reject();
  }
  return res.json();
};

export { postData, getResource };
