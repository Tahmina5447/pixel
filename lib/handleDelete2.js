import swal from "sweetalert";
import { getAdminToken } from "./getToken";
const handleDelete2 = (url,refetch) => {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getAdminToken()}` // Include the bearer token here
    }
  })
    .then((res) => res.json())
    .then((data) => {

      if (data.status === "success") {
        refetch()
        swal("Successfully deleted!", {
          icon: "success",
        });
      } else {
        swal("Failed..! Please check your internet connection", {
          icon: "warning",
        });
      }
    });
};

export default handleDelete2;
