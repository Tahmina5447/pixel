import { useQueryClient } from 'react-query';
import server_url from '../../lib/config';

const useCustomMutation = (queryKey, query, method) => {
    const queryClient = useQueryClient();

    const fetchData = async (postData) => {
        const apiUrl = `${server_url}/${query}`;
        const requestOptions = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    };

    const sendRequest = async (postData) => {
        try {
            const data = await fetchData(postData);
            queryClient.refetchQueries(queryKey);
            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    return sendRequest;
};

export default useCustomMutation;
