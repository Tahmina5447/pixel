const getFetchWithId = async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        setFunction(data.data);
      }
    });
};

export default getFetchWithId;
