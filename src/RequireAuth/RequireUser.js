import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AuthUser from "../../lib/AuthUser";
import { useUserData } from "../hooks/useMyShopData";

const RequireUser = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { logout } = AuthUser();
    const { user, isLoading } = useUserData();

    useEffect(() => {
      const userRole = user?.data?.role;
      if (userRole !== "user") {
        logout();
        router.push({
          query: { from: router.asPath },
          pathname: "/auth/login",
        });
      }
    }, [user, logout, router]);
    if (isLoading) {
      return <p>loading..</p>;
    }
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RequireUser;
