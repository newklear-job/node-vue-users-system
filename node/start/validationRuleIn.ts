/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'in',
  (value, [{ acceptableValues }], { pointer, arrayExpressionPointer, errorReporter }) => {
    if (typeof value !== 'string') {
      return
    }

    if (!acceptableValues.includes(value)) {
      errorReporter.report(
        pointer,
        'in',
        `Field is not in acceptable values: ${acceptableValues.toString()}`,
        arrayExpressionPointer
      )
    }
  }
)
