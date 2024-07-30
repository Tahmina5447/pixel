import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AuthUser() {
  const navigate = useRouter();
  const getToken = () => {
    if (typeof window !== "undefined") {
      const tokenString = localStorage.getItem("access");
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
  };

  const getUser = () => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem("email");
      const user_detail = JSON.parse(userString);
      return user_detail;
    }
  };

  const getUserRole = () => {
    if (typeof window !== "undefined") {
      const roleString = localStorage.getItem("role");
      const role_name = JSON.parse(roleString);
      return role_name;
    }
  };
  const getUserInfo = () => {
    if (typeof window !== "undefined") {
      const userInfoString = localStorage.getItem("user_info");
      const user_info = JSON.parse(userInfoString);
      return user_info;
    }
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [userRole, setUserRole] = useState(getUserRole());
  const [email, setEmail] = useState(getUser());
  const [userInfo, setUserInfo] = useState(getUserInfo());

  const saveToken = (email, access, role, userInfo) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access", JSON.stringify(access));
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("role", JSON.stringify(role));
      localStorage.setItem("user_info", JSON.stringify(userInfo));

      setEmail(email);
      setToken(token);
      setUserInfo(userInfo);
      setUser(user);
      setUserRole(userRole);

      (async () => {
        await navigate.push("/");
      })();
    }
  };

  const logout = () => {
    localStorage.clear();
    (async () => {
      await navigate.push("/auth/login");
    })();
  };

  const http = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    setToken: saveToken,
    token,
    userRole,
    getToken,
    http,
    email,
    getUserInfo,
    userInfo,
    logout,
  };
}
