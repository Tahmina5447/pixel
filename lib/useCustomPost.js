export const useCustomPost = (
    url,
    body,
    token
    ) => {
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
      },
        body: JSON.stringify(body),
    })
      .then((res) => res.json())
    .then((data) => {
        if (data.code === 200) {
            // setFunction(data.data);
            swal("success", data.message, "success");
            // router.push("/checkout/success-order");
        }
         else{
            swal("error", data.error, "error");
        }
    });
  };
