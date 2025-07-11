class RestPaths
{
    constructor(private readonly root : string) { }

    get login() { return `${this.root}/login`; }

    get logout() { return `${this.root}/logout`; }

    get users() { return `${this.root}/users`; }

    user(userId: number) { return `${this.root}/users/${userId}`; }

    sellerItems(sellerId: number) { return `${this.root}/sellers/${sellerId}/items`; }

    get items() { return `${this.root}/items`; }

    itemsRange(start: number, count: number) { return `${this.root}/items?offset=${start}&limit=${count}`; }

    item(itemId: number) { return `${this.root}/items/${itemId}`; }

    get categoryCounts() { return `${this.root}/categories?counts=visible`; }

    get categories() { return `${this.root}/categories`; }

    get sales() { return `${this.root}/sales`; }

    recentSales(count: number) { return `${this.root}/sales?order=antichronological&offset=0&limit=${count}`; }

    sale(saleId: number) { return `${this.root}/sales/${saleId}`; }

    cashierSales(cashierId: number) { return `${this.root}/cashiers/${cashierId}/sales`; }
}

export const paths = new RestPaths(ROOT_URL);
