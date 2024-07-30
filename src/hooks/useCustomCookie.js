export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};


 export const getCookie = (name) => {
   const cookies = document.cookie.split("; ");
   for (let i = 0; i < cookies.length; i++) {
     const cookie = cookies[i].split("=");
     if (cookie[0] === name) {
       return cookie[1];
     }
   }
   return "";
 };