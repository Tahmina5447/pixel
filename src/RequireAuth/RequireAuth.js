import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthUser from "../../lib/AuthUser";

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const { userInfo, logout } = AuthUser();
  const location = router.asPath;
  useEffect(() => {
    if (userInfo?.role !== "user") {
      logout();
      router.push({
        pathname: "/auth/register",
        query: { from: router.asPath },
      });
    }
  }, [userInfo, router]);

  return userInfo?.role === "user" ? children : null;
};

export default RequireAuth;
