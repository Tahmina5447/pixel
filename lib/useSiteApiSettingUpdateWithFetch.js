
import server_url from "./config";
import { getAdminToken } from "./getToken";

const useSiteApiSettingUpdateWithFetch = (bodyData = {}, setData = () => { }, setLoading=()=>{}) => {
    // const fromRawJson = reactLocalStorage.getObject("siteApi", true);
    // const dataFromLocal = JSON.parse(fromRawJson)

    // if (fromRawJson && JSON.stringify(bodyData) === '{}') {
    //     return setData(dataFromLocal)
    // }

    fetch(`${server_url}/site-api-setting/update-site-api-setting`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${getAdminToken()}` 
        },
        body: JSON.stringify(bodyData),
    })
        .then((res) => res.json())
        .then((data) => {

            if (data?.status === "success") {
                // write hook return data
                // reactLocalStorage.setObject("siteApi", JSON.stringify(data));
                setData(data)
                setLoading(false)
            }
        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
            setLoading(false)
        });

};

export default useSiteApiSettingUpdateWithFetch;
