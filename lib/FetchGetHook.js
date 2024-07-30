const FetchGetHook = async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setFunction(data.data.data.result);
    });
};

export default FetchGetHook;
