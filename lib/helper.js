import { server_url_v4 } from "./config";

const base_url = "http://localhost:5000/api/v1";
export const base_url_v2 = "http://localhost:5000/api/v2";

export const products = async (query = "") => {
  const response = await fetch(`${base_url}/product?status=true&${query}`);
  const json = await response.json();
  return json;
};

export const shippingCost = async (query = "") => {
  const response = await fetch(
    `${base_url}/delivery-cost?status=active&${query}`
  );
  const json = await response.json();
  return json;
};
export const othersCityShippingCost = async () => {
  const response = await fetch(
    `${base_url}/delivery-cost/others-city-shipping-cost`
  );
  const json = await response.json();
  return json;
};
export const getUsers = async (query = "") => {
  const response = await fetch(`${base_url}/user?${query}`);
  const json = await response.json();

  return json;
};
// get user by id
export const getUsersById = async (id) => {
  const response = await fetch(`${base_url}/user/${id}`);
  const json = await response.json();
  return json;
};
export const getOrderList = async (query = "") => {
  const response = await fetch(`${base_url}/order?sort=-createdAt&${query}`);
  const json = await response.json();
  return json;
};

export const getOrderById = async (id) => {
  const response = await fetch(`${base_url}/order/${id}`);
  const json = await response.json();
  return json;
};

export const getDashboardOverview = async (query = "") => {
  const response = await fetch(
    `${base_url}/dashboard/admin-dashboard?${query}`
  );
  const json = await response.json();
  return json;
};
export const getDashboardProfitOverview = async (query = "") => {
  const response = await fetch(`${base_url}/dashboard/profit?${query}`);
  const json = await response.json();
  return json;
};

export const getDashboardCart = async (queryFilter = "") => {
  const response = await fetch(`${server_url_v4}/cart/all-cart?${queryFilter}`);
  const json = await response.json();
  return json;
};

export const getTodayOrderOverview = async () => {
  const response = await fetch(`${base_url}/dashboard/today-orders`);
  const json = await response.json();
  return json;
};
// get product by id
export const fetchProduct = async (id) => {
  const response = await fetch(`${base_url}/product/${id}`);
  const json = await response.json();
  return json;
};
export const getCategories = async () => {
  const response = await fetch(
    `http://localhost:5000/api/v1/category?status=true`
  );
  const json = await response.json();
  return json;
};

export const getCoupons = async (query = "") => {
  let url = base_url + "/coupons";
  if (query) {
    url = `${base_url}/coupons?${query}`;
  }
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const getCategoriesItem = async () => {
  const response = await fetch(
    `http://localhost:5000/api/v1/category`
  );
  const json = await response.json();
  return json;
};

export const getCategoriesAndSubCategory = async () => {
  const response = await fetch(
    `http://localhost:5000/api/v1/category/category-and-subcategory`
  );
  const json = await response.json();
  return json;
};

export const updateProduct = async (url, data) => {
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if ((data.status = "success")) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// user dashboard order total and pending total , cancel total
export const getUserDashboardInfo = async (id) => {
  const response = await fetch(
    `${base_url}/dashboard/user-dashboard?userId=${id}`
  );
  const json = await response.json();
  return json;
};

export const getExpaince = async () => {
  const response = await fetch(
    `${base_url_v2}/expense-calculate/all?sort=columnPosition`
  );
  const json = await response.json();
  return json;
};

export const getExpainceRow = async () => {
  const response = await fetch(
    `${base_url_v2}/expense-calculate-sub-item?sort=rowPosition`
  );
  const json = await response.json();
  return json;
};
//here only pass query after ? mark and for multiple query use &
export const getProductWithQuery = async (query = "") => {
  const response = await fetch(`${base_url}/product?${query}`);
  const json = await response.json();
  return json;
};
//here only pass query after ? mark and for multiple query use &
export const getMyShopData = async () => {
  const response = await fetch(`${base_url}/my-shop`);
  const json = await response.json();
  return json;
};

// get account balance
export const getAcount = async (url) => {
  const response = await fetch(`${url}`);
  const json = await response.json();
  return json;
};

export const geBalanceHistory = async (url, query = "") => {
  const response = await fetch(`${url}${query}`);
  const json = await response.json();
  return json;
};

export const getRowData = async (url, query = "") => {
  const response = await fetch(`${url}${query}`);
  const json = await response.json();
  return json;
};

// ------------get balance category-------------
// export const getBalanceCategory = async (url,query="") => {
//   const response = await fetch(`${base_url_v2}/${url}?${query}`);
//   const json = await response.json();
//   return json;
// };

// here accounting dashboard overview

// its use for accounting overview 3 total
export const getAccountingOverview = async (query = "") => {
  const response = await fetch(
    `${base_url_v2}/expenses/overview-expense-income-return?${query}`
  );
  const json = await response.json();
  return json;
};

export const v2QueryFetch = async (query = "") => {
  const response = await fetch(`${base_url_v2}${query}`);
  const json = await response.json();
  return json;
};
