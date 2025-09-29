import { ErrorTag } from "./result";

export type RestStatus<T> =
    | { status: 'loading' }
    | { status: 'error'; tag: ErrorTag; details: string }
    | { status: 'success'; value: T };
