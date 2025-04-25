class RestPaths
{
    constructor(private readonly root : string) { }

    get login() { return `${this.root}/login`; }

    get logout() { return `${this.root}/logout`; }

    get users() { return `${this.root}/users`; }

    user(userId: number) { return `${this.root}/users/${userId}`; }

    sellerItems(sellerId: number) { return `${this.root}/sellers/${sellerId}/items`; }

    get items() { return `${this.root}/items`; }

    get categoryCounts() { return `${this.root}/categories`; }
}

export const paths = new RestPaths(ROOT_URL);
