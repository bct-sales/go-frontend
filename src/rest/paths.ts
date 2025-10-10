export interface URL
{
    str(): string;
}

class ConcreteURL implements URL
{
    constructor(protected readonly urlParts: string[], protected readonly queryParameters: { [key: string]: string }) { }

    addUrlParts(...parts: string[]): ConcreteURL
    {
        return new ConcreteURL([...this.urlParts, ...parts], this.queryParameters);
    }

    addQuery(key: string, value: string): ConcreteURL
    {
        return new ConcreteURL(this.urlParts, { ...this.queryParameters, [key]: value });
    }

    str(): string
    {
        const buildQueryPart = () =>
        {
            const entries = Object.entries(this.queryParameters);

            if ( entries.length !== 0 )
            {
                return "?" + Object.entries(this.queryParameters).map(([key, value]) => `${key}=${value}`).join("&");
            }
            else
            {
                return "";
            }
        };

        const path = this.urlParts.join('/');
        return `${path}${buildQueryPart()}`;
    }
}

class URLWrapper implements URL
{
    constructor(protected readonly url: ConcreteURL) { }

    str() { return this.url.str(); }
}

class UsersURL extends URLWrapper
{
    withFormat(format: 'csv' | 'json'): UsersURL
    {
        return new UsersURL(this.url.addQuery('format', format));
    }
}

class ItemsURL extends URLWrapper
{
    withFormat(format: 'csv' | 'json'): ItemsURL
    {
        return new ItemsURL(this.url.addQuery('format', format));
    }

    withRowRange(offset: number, limit: number): ItemsURL
    {
        return new ItemsURL(this.url.addQuery('offset', offset.toString()).addQuery('limit', limit.toString()));
    }
}

class SoldItemsURL extends URLWrapper
{
    withFormat(format: 'csv' | 'json'): SoldItemsURL
    {
        return new SoldItemsURL(this.url.addQuery('format', format));
    }
}

class RestPaths
{
    private readonly root: ConcreteURL;

    constructor(root: string)
    {
        this.root = new ConcreteURL([root], {});
    }

    get login() { return this.root.addUrlParts('login') as URL; }

    get logout() { return this.root.addUrlParts('logout') as URL; }

    get users() { return new UsersURL(this.root.addUrlParts('users')); }

    user(userId: number): URL { return this.root.addUrlParts('users', userId.toString()); }

    sellerItems(sellerId: number) { return `${this.root.str()}/sellers/${sellerId}/items`; }

    get items() { return new ItemsURL(this.root.addUrlParts('items')); }

    itemsInCategory(categoryId: number) { return `${this.root.str()}/items?category=${categoryId}`; }

    item(itemId: number) { return this.root.addUrlParts('items', itemId.toString()); }

    get itemCountsByCategory() { return `${this.root.str()}/categories?counts=visible`; }

    get soldItemCountsByCategory() { return `${this.root.str()}/categories?counts=sold`; }

    get categories() { return `${this.root.str()}/categories`; }

    get sales() { return `${this.root.str()}/sales`; }

    get soldItems() { return new SoldItemsURL(this.root.addUrlParts('sales', 'items')); }

    recentSales(count: number) { return `${this.root.str()}/sales?order=antichronological&offset=0&limit=${count}`; }

    sale(saleId: number) { return `${this.root.str()}/sales/${saleId}`; }

    cashierSales(cashierId: number) { return `${this.root.str()}/cashiers/${cashierId}/sales`; }

    recentCashierSales(cashierId: number, count: number, offset: number) { return `${this.root.str()}/cashiers/${cashierId}/sales?order=antichronological&offset=${offset}&limit=${count}`; }
}

export const paths = new RestPaths(ROOT_URL);
