//here make landing page gallary image structure data

export const imageGat = (pages) => {


    // products = [], galleryImages = []
    const { products, productImage } = pages
    let images = [...productImage]


    pages?.products?.forEach(product => {


        if (product?.image) {
            images.push(product.image);
        }
        // if (product?.image?.length > 1) {
        //     images = images.concat(product?.imageUrls.slice(2));
        // }

    });


    return images;

};
