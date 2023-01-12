function wrapIntoPair(key: string, value: string) {
    return {
        pair: {
            key, value
        }
    }
}

export default (variant: any) => {

    const productId = `product-${variant.product.externalReference}`;
    const categories = variant.product.topics?.map((topic: any) => topic.path) ?? [];
    categories.push(variant.product.cataloguePath.split('/')[1]);
    const variantId = `${productId}-variant-${variant.sku}`;
    const unPairedRecord = {
        id: variantId,
        name: variant.name.en,
        itemGroupId: productId,
        sku: variant.sku,
        inStock: "yes",
        currency: "EUR",
        price: variant.price.default,
        salesPrice: variant.price.sales,
        url: `https://furniture.superfast.store/en/${variant.product.cataloguePath}?sku=${variant.sku}`,
        category: categories.join(';'),
        listCategory: 'KLEVU_PRODUCT',
        image: variant.images[0].src,
    };


    return {
        pairs: Object.entries(unPairedRecord).map(([key, value]) => wrapIntoPair(key, value))
    };

}
