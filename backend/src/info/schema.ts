import Joi from 'joi';

export const applicantSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    location: Joi.string().required(),
    hobbies: Joi.array().items(Joi.string()),
    tag: Joi.string()
});
