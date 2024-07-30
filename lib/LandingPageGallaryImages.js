//here make landing page gallary image structure data

export const LandingPageGallaryImages = (pages) => {


    // products = [], galleryImages = []
    const { products, galleryImages } = pages
    let images = [...galleryImages]



    pages?.products?.forEach(product => {

       

        if (product?.image) {
            images.push(product.image);
        }
        if (product?.imageUrls?.length > 1) {
            images = images.concat(product?.imageUrls.slice(2));
        }

    });


    return images;

};
