export const calculateDiscount = (productPrice, salePrice) => {
    let discountAmount = productPrice - salePrice;
    let discountPercentage = (discountAmount / productPrice) * 100;
    return Math.round(discountPercentage);  // Round to the nearest whole number
}
