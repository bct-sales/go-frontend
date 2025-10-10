export interface URL
{
    toString(): string;
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

    toString(): string
    {
        const buildQueryPart = () =>
        {
            const entries = Object.entries(this.queryParameters);

            if ( entries.length !== 0 )
            {
                return "?" + Object.entries(this.queryParameters).map((key, value) => `${key}=${value}`).join("&");
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

export class UsersURL implements URL
{
    constructor(private readonly url: ConcreteURL) { }

    withFormat(format: 'csv' | 'json'): URL
    {
        return new UsersURL(this.url.addQuery('format', format));
    }
}

export class UserURL implements URL
{
    constructor(private readonly url: ConcreteURL) { }
}

class RestPaths
{
    private readonly root: ConcreteURL;

    constructor(root: string)
    {
        this.root = new ConcreteURL([root], {});
    }

    get login(): URL { return this.root.addUrlParts('login'); }

    get logout(): URL { return this.root.addUrlParts('logout'); }

    get users(): UsersURL { return new UsersURL(this.root.addUrlParts('users')); }

    user(userId: number): UserURL { return new UserURL(this.root.addUrlParts('users', userId.toString())); }

    sellerItems(sellerId: number) { return `${this.root.toString()}/sellers/${sellerId}/items`; }

    get items() { return `${this.root.toString()}/items`; }

    get itemsAsJson() { return `${this.items}?format=json`; }

    get itemsAsCsv() { return `${this.items}?format=csv`; }

    itemsInCategory(categoryId: number) { return `${this.root.toString()}/items?category=${categoryId}`; }

    itemsRange(start: number, count: number) { return `${this.root.toString()}/items?offset=${start}&limit=${count}`; }

    item(itemId: number) { return `${this.root.toString()}/items/${itemId}`; }

    get itemCountsByCategory() { return `${this.root.toString()}/categories?counts=visible`; }

    get soldItemCountsByCategory() { return `${this.root.toString()}/categories?counts=sold`; }

    get categories() { return `${this.root.toString()}/categories`; }

    get sales() { return `${this.root.toString()}/sales`; }

    get soldItems() { return `${this.root.toString()}/sales/items`; }

    get soldItemsAsJson() { return `${this.root.toString()}/sales/items?format=json`; }

    get soldItemsAsCsv() { return `${this.root.toString()}/sales/items?format=csv`; }

    recentSales(count: number) { return `${this.root.toString()}/sales?order=antichronological&offset=0&limit=${count}`; }

    sale(saleId: number) { return `${this.root.toString()}/sales/${saleId}`; }

    cashierSales(cashierId: number) { return `${this.root.toString()}/cashiers/${cashierId}/sales`; }

    recentCashierSales(cashierId: number, count: number, offset: number) { return `${this.root.toString()}/cashiers/${cashierId}/sales?order=antichronological&offset=${offset}&limit=${count}`; }
}

export const paths = new RestPaths(ROOT_URL);
