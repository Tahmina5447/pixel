export const usePostOrder = (url, body, setFunction, router,setLoading=()=>{}) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
        swal("success", data.message, "success");
        router.push(`/checkout/order-success/${data?.data?._id}`);
        setLoading(false)
      }
      if (data.status === "fail") {
        swal("error", data.error, "error");
        setLoading(false)
      }
    });
};

export const usePostOrder2 = (url, body, setFunction, router,setLoading=()=>{},setlocalStorageCartItems=()=>{}) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
        swal("success", data.message, "success");
        router.push(`/checkout/order-success/${data?.data?._id}`);
        setLoading(false)
        setlocalStorageCartItems(0)
        localStorage.removeItem("shopping-cart");
      }
      if (data.status === "fail") {
        swal("error", data.error, "error");
        setLoading(false)
      }
    });
};


export const usePostCustomeOrder = (url, body, setFunction,router) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
        swal("success", data.message, "success");
        router.push("/admin/orders");
      }
      if (data.status === "fail") {
        swal("error", data.error, "error");
      }
    });
};
