import Joi from 'joi'

export const signupValidator = Joi.object({
 firstName: Joi.string().required(),
 lastName: Joi.string().required(),
 email: Joi.string().required().email(),
 password: Joi.string().required(),
})

export const loginValidator = Joi.object({
 email: Joi.string().required().email(),
 password: Joi.string().required(),
})
