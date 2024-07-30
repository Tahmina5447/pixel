import { useQuery } from "react-query";
import AuthUser from "../../lib/AuthUser";
import server_url from "../../lib/config";

export function useMyShopData() {
  const { isLoading, data, error } = useQuery("myShopData", async () => {
    const response = await fetch(`${server_url}/my-shop`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  return { isLoading, data, error };
}

export function useCustomQuery(queryCatch, query = "") {
  const { isLoading, data, error, refetch } = useQuery(
    [queryCatch, query],
    async () => {
      const response = await fetch(`${server_url}/${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );

  return { isLoading, data, error, refetch };
}

export function useUserData() {
  const { userInfo } = AuthUser();

  const {
    isLoading,
    data: user,
    error,
    refetch,
  } = useQuery(["user"], async () => {
    if (userInfo?._id) {
      const response = await fetch(`${server_url}/user/${userInfo._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });

  return { isLoading, user, error, refetch };
}
