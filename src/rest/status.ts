export type RestStatus<T> =
    | { status: 'loading' }
    | { status: 'error'; tag: string; details: string }
    | { status: 'success'; value: T };
