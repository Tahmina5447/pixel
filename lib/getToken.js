import { reactLocalStorage } from "reactjs-localstorage";

export function getAdminToken() {
    const access = reactLocalStorage.getObject("access", true);
    return access; // Assuming "token" is the key for your bearer token
}
