import { reactLocalStorage } from "reactjs-localstorage";

const updateCartLocalStorage = ({ action, product }) => {
  const getCart = reactLocalStorage.getObject("shopping-cart", true);
  const cart = JSON.parse(getCart);

  

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) =>it._id == product._id);
    if (action == "add") {
      isAvailableProduct.itemTotal += product.variantType? product.userSize.salePrice : product.salePrice;
      isAvailableProduct.quantity++;
      cart.totalItems++;
      cart.cartTotal += product.variantType? product.userSize.salePrice : product.salePrice;

      if(isAvailableProduct.quantity <= isAvailableProduct.offer_quantity){
        cart.cartTotal =  cart.cartTotal - isAvailableProduct.offer_discount
        cart.offerTotal += isAvailableProduct.offer_discount
        
      }
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    }
    if (action == "size") {
      isAvailableProduct.userSize = product.userSize;
      isAvailableProduct.price = product.userSize.productPrice;
      isAvailableProduct.salePrice = product.userSize.salePrice;
      isAvailableProduct.originalPrice = product.userSize.price;
      isAvailableProduct.userSelectSize = product.userSelectSize;
      isAvailableProduct.color = product.color,
      isAvailableProduct.size = product.size,
      isAvailableProduct.set = product.set,
      isAvailableProduct.design = product.design,
      isAvailableProduct.other = product.other,
      isAvailableProduct.userColor = product.userColor;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return;
    } else if (action == "minus") {
      isAvailableProduct.itemTotal -= product.variantType? product.userSize.salePrice : product.salePrice;
      isAvailableProduct.quantity--;
      cart.cartTotal -= product.variantType? product.userSize.salePrice : product.salePrice;

      if(Number(isAvailableProduct.offer_quantity) < isAvailableProduct.quantity ){
        cart.cartTotal =  cart.cartTotal + isAvailableProduct.offer_discount  
        cart.offerTotal -= isAvailableProduct.offer_discount 

      }


      if (isAvailableProduct.quantity < 1) {
        const result = cart.items.filter((it) => it?.variantType ? it.userSize?._id != product?.userSize?._id : it._id != product._id);
        //remove localstrote code
        cart.items = result;
        cart.totalItems--;

        reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
        return;
      }
      cart.totalItems--;


      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    } else if (action === "delete") {
      const result = cart.items.filter((it) => it?.variantType ? it.userSize?._id != product?.userSize?._id : it._id != product._id);
      //remove localstrote code
      cart.items = result;
      cart.totalItems -= isAvailableProduct.quantity;
      cart.cartTotal -=
        isAvailableProduct.quantity * isAvailableProduct.salePrice;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return;
    }
  }
};

export default updateCartLocalStorage;
