export function getTotalItemWeightCharge(cartItems) {
    return cartItems?.reduce((total, item) => total + ((Math.ceil(item.weight) / 1000) * 20), 0);
}