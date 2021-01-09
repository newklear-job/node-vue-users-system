export function formatValidationErrors(
  errors: ValidationErrors
): FrontValidationError {
  return errors.reduce((previous, next) => {
    return { ...previous, ...{ [next.field]: next.message } };
  }, {});
}

type ValidationErrors = Array<BackendValidationError>;

interface BackendValidationError {
  field: string;
  message: string;
  rule: string;
}

interface FrontValidationError {
  [field: string]: string;
}
