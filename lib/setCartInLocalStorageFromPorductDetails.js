import { reactLocalStorage } from "reactjs-localstorage";

const setCartInLocalStorageFromPorductDetails = (
  product,
  filterItem,
  selectColor,
  inputSize,
  qyt
) => {
  const items = {
    price: product?.variantType ? filterItem?.productPrice : product.productPrice,
    salePrice: product?.variantType ? filterItem?.salePrice : product?.salePrice,
    originalPrice: product?.variantType ? filterItem?.price : product?.price,
    discount: 0,
    _id: product?._id,
    path:product?.path,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    parent_category: product?.parent_category,
    weight:product?.weight,
    first_child_category: product?.first_child_category,
    second_child_category: product?.second_child_category,
    quantity: qyt,
    productTitle: product?.name,
    delivery: product?.delivery,
    sku: "",
    userSize: filterItem,
    userSelectSize: inputSize,
    userColor: selectColor,
    productColor: product.productColor,
    offer_discount: product?.offer_discount,
    offer_quantity: product?.offer_quantity,
    type: product?.type,
    size: product?.variantType ? filterItem.size : "",
    color: product?.variantType ? filterItem.color : "",
    set: product?.variantType ? filterItem.set : "",
    design: product?.variantType ? filterItem.design : "",
    other: product?.variantType ? filterItem.other : "",
    variantType: product?.variantType,
    attributes: product?.attributes,
    variant: product?.variant,
    itemTotal: (product?.variantType ? filterItem?.salePrice : product?.salePrice) * qyt,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: qyt,
    offerTotal: 0,
    totalUniqueItems: 1,
    cartTotal: (product?.variantType ? filterItem?.salePrice : product?.salePrice) * qyt,
    _id: "",
  };

  const getCart = reactLocalStorage.getObject("shopping-cart", true);
  const cart = JSON.parse(getCart);

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) =>
      it?.variantType ? it.userSize?._id == filterItem?._id : it._id == product._id
    );

    if (isAvailableProduct) {
      isAvailableProduct.updatedDate = new Date().toString();
      isAvailableProduct.quantity += qyt;
      isAvailableProduct.itemTotal += (product?.variantType ? filterItem?.salePrice : product?.salePrice) * qyt;
      cart.totalItems += qyt;
      cart.cartTotal += (product?.variantType ? filterItem?.salePrice : product?.salePrice) * qyt;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return true;
    } else {
      cart.items.push(items);
      cart.totalItems += qyt;
      cart.totalUniqueItems++;
      cart.cartTotal += (product?.variantType ? filterItem?.salePrice : product?.salePrice) * qyt;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    }
  } else {
    cartProduct.items.push(items);
    reactLocalStorage.setObject("shopping-cart", JSON.stringify(cartProduct));
  }
};

export default setCartInLocalStorageFromPorductDetails;