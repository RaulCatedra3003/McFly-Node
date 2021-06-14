import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(4000),
  CLIENT_URL: Joi.string().required(),
  MONGO_DB_URL: Joi.string().required(),
  JWT_KEY: Joi.string().required(),
});
