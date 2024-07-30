import { reactLocalStorage } from "reactjs-localstorage";

const setWishlistInLocalStorage = (product) => {
  const items = {
    price: product?.productPrice,
    salePrice: product?.salePrice,
    discount: 0,
    _id: product?._id,
    path: product?.path,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    originalPrice: product?.price,
    category: product?.category,
    quantity: 1,
    productTitle: product?.name,
    sku: "",
    itemTotal: product?.salePrice,
    size: product.size,
    productColor: product?.productColor,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: 1,
    totalUniqueItems: 1,
    cartTotal: product?.salePrice,
    _id: "",
  };

  const getCart = reactLocalStorage.getObject("wishlist", true);
  const cart = JSON.parse(getCart);

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id == product._id);

    if (isAvailableProduct) {
      /* isAvailableProduct.updatedDate = new Date().toString();
      isAvailableProduct.quantity += 1;
      cart.totalItems++;
      reactLocalStorage.setObject("wishlist", JSON.stringify(cart)); */
      return true;
    } else {
      cart.items.push(items);
      cart.totalItems++;
      cart.totalUniqueItems++;
      cart.cartTotal = cart.cartTotal + product.salePrice;
      reactLocalStorage.setObject("wishlist", JSON.stringify(cart));
    }
  } else {
    // if product not available in localstorage
    cartProduct.items.push(items);
    reactLocalStorage.setObject("wishlist", JSON.stringify(cartProduct));
  }
  // localStorage.setItem("wishlist", JSON.stringify(cartProduct));
};

export default setWishlistInLocalStorage;
