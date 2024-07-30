import swal from "sweetalert";
import { getAdminToken } from "./getToken";
export const handlePostMethod = (url, body, setFunction) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` // Include the bearer token here

    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => setFunction(data?.data));
};

export const postMethodHook = (url, body, refetch = () => {},setLoading=()=>{},reset=()=>{}) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        refetch();
        setLoading(false)
        reset();
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        setLoading(false)
      }
    });
};

export const postMethodHookCup = (url, body,setLoading=()=>{},router) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        setLoading(false)
        router.push("/admin/coupons")
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        setLoading(false)
      }
    });
};

export const updateMethodHook = (url, body, refetch = () => { },setLoading=()=>{}) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === "success") {
        setLoading(false)
        refetch();
        swal("success", data?.message, "success");
      }
      if (data.status === "fail") {
        setLoading(false)
        swal("error", data?.error || data?.message, "error");
      }
    });
};
export const updateMyShopHook = (url, body, refetch = () => { },setLoading=()=>{}) => {
  fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {

      if (data?.status === "success") {
        setLoading(false)
        refetch();
        swal("success", data?.message, "success");
      }
      if (data.status === "fail") {
        setLoading(false)
        swal("error", data?.error || data?.message, "error");
      }
    });
};
export const deleteMethod = (url, refetch) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this information!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      fetch(url, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${getAdminToken()}` 
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "success") {
            swal("success", data?.message, "success");
            refetch();
          }
          if (data.status === "fail") {
            swal("error", data?.error, "error");
          }
        });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};


export const ModalPostMethodHook = (url, body, refetch = () => { }, setLoading = () => { }, showModal = () => { }) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        refetch();
        setLoading(false)
        showModal(false)
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        setLoading(false)
      }
    });
};

export const ModalPostReturnMethodHook = (url, body, refetch = () => { },returnRefetch= () => { }, setLoading = () => { }, showModal = () => { }) => {
  setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        refetch();
        returnRefetch();
        setLoading(false);
        showModal(false);
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        setLoading(false)
      }
    });
};


export const ModalUpdateMethodHook = (url, body, refetch = () => { }, setLoading = () => { }, showModal = () => { }) => {
  setLoading(true)
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        refetch();
        swal("success", data.message, "success");
        setLoading(false)
        showModal(false)
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        setLoading(false)
      }
    });
};


export const UpdateNewMethodHook = (url, body, refetch, rowrefetch) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "fail") {

        refetch()
        rowrefetch()
        swal("error", "Something went wrong , Please try again", "error");
      }
    });
};


// custom post methoud hook
export const CustomPostMethodHook = (url, body, fetchSuccess) => {
  fetchSuccess?.setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        fetchSuccess?.setLoading(false)
        fetchSuccess?.setSelectedAccount()
        fetchSuccess?.setSelectedCategory()
        fetchSuccess?.reset()
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        fetchSuccess?.setLoading(false)
      }
    });
};

// custom ExpanseIncome post method hook
export const ExpanseIncomeMethodHook = (url, body, fetchSuccess,setShow,overRefetch,accountRefetch) => {
  fetchSuccess?.setLoading(true)
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        swal("success", data.message, "success");
        fetchSuccess?.setLoading(false)
        fetchSuccess?.setSelectedAccount()
        fetchSuccess?.setSelectedCategory()
        fetchSuccess?.reset()
        setShow(false)
        overRefetch()
        accountRefetch()
      }
      if (data.status === "fail") {
        swal("error", data.message || data.error, "error");
        fetchSuccess?.setLoading(false)
      }
    });
};


export const updateExpanseHook = (url, body, refetch = () => { },setAddExpenseModalOpen=()=>{},overRefetch=()=>{},accountRefetch=()=>{}) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${getAdminToken()}` 
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status === "success") {
        refetch();
        setAddExpenseModalOpen(false)
        overRefetch()
        accountRefetch()
        swal("success", data?.message, "success");
      }
      if (data.status === "fail") {
        swal("error", data?.error || data?.message, "error");
      }
    });
};