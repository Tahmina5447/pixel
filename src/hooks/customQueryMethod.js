import { useQuery } from "react-query";
import server_url from "../../lib/config";


// privately 
export function useCustomQueryFetchMethod(queryCatch, query = "") {
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

