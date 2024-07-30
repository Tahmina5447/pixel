import { useEffect, useState } from "react";

const useMainDomain = () => {
  const [mainDomain, setMainDomain] = useState("");

  useEffect(() => {
    const getMainDomain = () => {
      const { hostname } = window.location;
      const segments = hostname.split(".");
      const topLevelDomain = segments[segments.length - 1];
      const secondLevelDomain = segments[segments.length - 2];
      const mainDomain = `${secondLevelDomain}.${topLevelDomain}`;

      setMainDomain(mainDomain);
    };

    getMainDomain();
  }, []);

  return mainDomain;
};

export default useMainDomain;
