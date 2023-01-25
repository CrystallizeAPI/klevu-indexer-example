function wrapIntoPair(key: string, value: string) {
    return {
        pair: {
            key,
            value,
        },
    };
}

export default (variant: any) => {
    const productId = `product-${variant.product.externalReference}`;
    const topicCategories: string[] =
        variant.product.topics?.flatMap((topic: any) => topic.path.split('/').filter((s: string) => s.length > 0)) ??
        [];

    const productCategories: string[] = (variant.product.cataloguePath as string)
        .split('/')
        .filter((s: string) => s.length > 0)
        .slice(0, -1);
    const categories: string[] = [];
    const topic = topicCategories.at(-1);
    if (topic) {
        categories.push(topic);
    }
    const productCategory = productCategories.at(-1);
    if (productCategory) {
        categories.push(productCategory);
    }

    const variantId = `${productId}-variant-${variant.sku}`;
    const unPairedRecord = {
        id: variantId,
        name: variant.name.en,
        itemGroupId: productId,
        sku: variant.sku,
        inStock: 'yes',
        currency: 'EUR',
        price: variant.price.default,
        salesPrice: variant.price.sales,
        url: `https://furniture.superfast.store/en${variant.product.cataloguePath}?sku=${variant.sku}`,
        category: categories.join(';'),
        listCategory: `KLEVU_PRODUCT;;${
            topicCategories.length > 0 ? topicCategories.join(';') + ';;' : ''
        }${productCategories.join(';')}`,
        image: variant.images[0].src,
    };

    return {
        pairs: Object.entries(unPairedRecord).map(([key, value]) => wrapIntoPair(key, value)),
    };
};
