import { ErrorTag } from "./result";

export type RestStatus<T> =
    | { readonly status: 'loading' }
    | { readonly status: 'error'; readonly tag: ErrorTag; readonly details: string }
    | { readonly status: 'success'; readonly value: T };
