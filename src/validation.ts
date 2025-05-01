type ValidationResult<T> =
  | { isValid: true }
  | { isValid: false; errors: T[] };


export enum PriceError
{
    MustBePositive,
    MustBeMultipleOf50,
}

function createValidationResult<T>(errors: T[]): ValidationResult<T>
{
    if ( errors.length !== 0 )
    {
        return {
            isValid: false,
            errors: errors,
        };
    }
    else
    {
        return {
            isValid: true,
        };
    }
}

export function validatePrice(priceInCents: number): ValidationResult<PriceError>
{
    const errors: PriceError[] = [];

    if ( priceInCents <= 0 )
    {
        errors.push(PriceError.MustBePositive);
    }

    if ( priceInCents % 50 !== 0 )
    {
        errors.push(PriceError.MustBeMultipleOf50);
    }

    return createValidationResult<PriceError>(errors);
}

export enum DescriptionError
{
    CannotBeEmpty,
}

export function validateDescription(description: string): ValidationResult<DescriptionError>
{
    const errors: DescriptionError[] = [];

    if ( description.trim().length === 0 )
    {
        errors.push(DescriptionError.CannotBeEmpty);
    }

    return createValidationResult<DescriptionError>(errors);
}
