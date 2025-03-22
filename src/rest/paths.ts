class RestPaths
{
    constructor(private readonly root : string) { }

    get login() { return `${this.root}/login`; }

    get logout() { return `${this.root}/logout`; }

    get users() { return `${this.root}/users`; }

    get items() { return `${this.root}/admin/items`; }

    get categoryCounts() { return `${this.root}/category-counts`; }
}

export const paths = new RestPaths(ROOT_URL);
