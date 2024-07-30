const getFetchFunction = async (url, setFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data?.data?.products) {
        setFunction(data?.data?.products);
      }
      if (data?.data?.result) {
        setFunction(data?.data?.result);
      }
    });
};

export default getFetchFunction;
