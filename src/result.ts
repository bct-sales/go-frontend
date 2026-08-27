export type Success<T> = {
    success: true;
    value: T;
};

export type Failure<E> = {
    success: false;
    error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;

export function success<T>(value: T): Success<T> {
    return { success: true, value };
}

export function failure<T>(error: T): Failure<T> {
    return { success: false, error };
}

export function is_success<T, E>(result: Result<T, E>): result is Success<T> {
    return result.success;
}

export function assert_success<T, E>(result: Result<T, E>): asserts result is Success<T> {
    if ( !is_success(result) ) {
        throw new Error("failure");
    }
}
