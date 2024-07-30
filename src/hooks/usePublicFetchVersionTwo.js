import { useQuery } from "react-query";
import { server_url_v2 } from "../../lib/config";


export function useFetchVersionTwo(queryCatch, query = "") {
    // queryCatch is array ex: ["cashname"]
    //if multiple time ["cachName",cachName]
    
    const { isLoading, data, error, refetch } = useQuery(
        queryCatch,
        async () => {
            const response = await fetch(`${server_url_v2}/${query}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }
    );

    return { isLoading, data, error, refetch }
}