import { getAdminToken } from "./getToken";

export const sumOfProductPrice = (products) => {
  const productPrice = products.items;
  const total = productPrice.reduce(
    (x, y) => x.price * x.quantity + y.price * y.quantity,
    0
  );
  return total;
};

export function sumOfSalePrice(product) {
  const products = product.items;
  if (!products.length > 0) {
    return 0;
  }
  let totalSalePrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalSalePrice += products[i].price * products[i].quantity;
  }
  return totalSalePrice;
}

export function sumOfSalePrice2(products) {
  if (!products.length > 0) {
    return 0;
  }
  let totalSalePrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalSalePrice += products[i].price * products[i].quantity;
  }
  return totalSalePrice;
}
export function sumOfCartPrice(product, setFunction) {
  const products = product.items;

  fetch(
    "http://localhost:5000/api/v1/invoice-count-no/get-total-price",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(products),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
      } else {
        setFunction({
          cartTotal: 0,
          originalProductPrice: 0,
        });
      }
    });
}

export function sumOfCartPrice2(products, setFunction) {
  fetch(
    "http://localhost:5000/api/v1/invoice-count-no/get-total-price",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(products),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
      } else {
        setFunction({
          cartTotal: 0,
          originalProductPrice: 0,
        });
      }
    });
}

export function removeElementAtIndex(index, arr) {
  // remove element at specified index using splice
  arr.splice(index, 1);

  return arr;
}

export function requireOrOptional(dataRight) {
  if (dataRight === 0) {
    return <span></span>;
  }
}
