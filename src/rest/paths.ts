class RestPaths
{
    constructor(private readonly root : string) { }

    get login() { return `${this.root}/login`; }

    get logout() { return `${this.root}/logout`; }
}

export const paths = new RestPaths(ROOT_URL);
