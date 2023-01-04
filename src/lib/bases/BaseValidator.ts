import Joi from 'joi'

/**
 * This class is the base class for all of my Validator classes. It provides a
 * common interface for all of them to extend.
 */
export class BaseValidator {
  protected joi = Joi
}
