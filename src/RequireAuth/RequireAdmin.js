import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthUser from "../../lib/AuthUser";

const RequireAuthAdmin = ({ children }) => {
  const router = useRouter();
  const { userInfo, logout } = AuthUser();
  useEffect(() => {
    if (userInfo?.role !== "admin") {
      logout();
      router.push({
        pathname: "/auth/register",
        query: { from: router.asPath },
      });
    }
  }, [userInfo, router]);

  return userInfo?.role === "admin" ? children : null;
};

export default RequireAuthAdmin;
