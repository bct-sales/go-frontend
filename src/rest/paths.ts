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

    withCategory(categoryId: number): ItemsURL
    {
        return new ItemsURL(this.url.addQuery('category', categoryId.toString()));
    }
}

class SoldItemsURL extends URLWrapper
{
    withFormat(format: 'csv' | 'json'): SoldItemsURL
    {
        return new SoldItemsURL(this.url.addQuery('format', format));
    }
}

class CategoriesURL extends URLWrapper
{
    withItemCounts(selection: 'visible' | 'hidden' | 'sold')
    {
        return new CategoriesURL(this.url.addQuery('items', selection));
    }
}

export class SalesURL extends URLWrapper
{
    withRowRange(offset: number, limit: number): SalesURL
    {
        return new SalesURL(this.url.addQuery('offset', offset.toString()).addQuery('limit', limit.toString()));
    }

    withOrder(order: 'chronological' | 'antichronological'): SalesURL
    {
        return new SalesURL(this.url.addQuery('order', order));
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

    sellerItems(sellerId: number) { return this.root.addUrlParts('sellers', sellerId.toString(), 'items') as URL; }

    get items() { return new ItemsURL(this.root.addUrlParts('items')); }

    item(itemId: number) { return this.root.addUrlParts('items', itemId.toString()); }

    get categories() { return new CategoriesURL(this.root.addUrlParts('categories')); }

    get sales() { return new SalesURL(this.root.addUrlParts('sales')); }

    get soldItems() { return new SoldItemsURL(this.root.addUrlParts('sales', 'items')); }

    sale(saleId: number) { return `${this.root.str()}/sales/${saleId}`; }

    cashierSales(cashierId: number) { return `${this.root.str()}/cashiers/${cashierId}/sales`; }

    recentCashierSales(cashierId: number, count: number, offset: number) { return `${this.root.str()}/cashiers/${cashierId}/sales?order=antichronological&offset=${offset}&limit=${count}`; }
}

export const paths = new RestPaths(ROOT_URL);
