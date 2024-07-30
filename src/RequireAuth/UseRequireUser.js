import { useRouter } from "next/router";
import AuthUser from "../../lib/AuthUser";
import useAdmin from "./UseAdmin";

const UseRequireUser = () => {
  const router = useRouter();
  const { logout, userInfo } = AuthUser();
  const [admin, adminLoading] = useAdmin(userInfo);

  useEffect(() => {
    if (!userInfo?.email) {
      logout();
      router.replace("/login", { from: router.pathname });
    }
  }, [user, loading, router]);

  if (loading || adminLoading) {
    return <Loading />;
  }

  return { user, admin };
};
