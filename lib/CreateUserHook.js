import swal from "sweetalert";
import server_url from "./config";

const CreateUserHook = async (userInfo, navigate, setToken, setLoading = () => { }) => {
  fetch(`${server_url}/user/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        setToken(
          data.data.user.email,
          data.data.token,
          data.data.user.role,
          data.data.user
        );
        setLoading(false)
        return swal("Good job!", "Account Created", "success");
      } else if (data.error.includes("Already you have an Account")) {
        setLoading(false)
        return swal(
          "Oops",
          `${data.error.split(":").slice(2).join(":")}`,
          "error"
        );
      } else {
        setLoading(false)
        return swal(
          "Oops",
          `${data.error.split(":").slice(2).join(":")}`,
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false)

    });
};

export default CreateUserHook;
