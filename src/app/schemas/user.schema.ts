export const userSignupSchema: object = {
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        name: { type: 'string' },
        lastName: { type: 'string' }
    },
    required: ['email', 'password', 'name', 'lastName'],
    type: 'object'
}

export const userLoginSchema: object = {
    addditionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    type: 'object'
}