import {
  AnySchema
  // ErrorFormattingOptions,
  // ErrorReport,
  // Err,
  // ErrorValidationOptions,
  // CreateErrorOptions,
  // ValidationError,
  // ValidationErrorFunction,
  // ValidationErrorItem
} from 'joi'
import { logger } from '@4lch4/logger'

/**
 * This interface defines the object that is returned by the `validate` method
 * of the {@link ValidationUtil} class.
 */
export interface IValidationResult {
  /** Indicates whether or not the object matches the given schema. */
  valid: boolean
}

// const obj0: ErrorFormattingOptions = {}

// const obj1: ErrorReport = {}

// const obj2: Err = {}

// const obj3: ErrorValidationOptions = {}

// const obj4: CreateErrorOptions = {}

// const obj5: ValidationError = {}

// const obj6: ValidationErrorFunction = {}

// const obj7: ValidationErrorItem = {}

/**
 * This class is a utility class that contains the validation logic for all of
 * the API endpoints. It's built using the `joi` library to handled the heavy
 * lifting of validating the objects.
 */
export class ValidationUtil {
  /**
   * This method will validate the given body object against the given Joi
   * schema and return the result(s).
   *
   * @param schema The Joi schema to use for validation.
   * @param body The body to validate.
   */
  public async validate<TSchema = any>(schema: AnySchema<TSchema>, body: any) {
    try {
      const validationResult = schema.validate(body)

      if (validationResult.error) {
        logger.error('Validation failed!')
        console.error(validationResult)

        return {
          valid: false
        }
      } else return validationResult
    } catch (error) {
      throw error
    }
  }
}
