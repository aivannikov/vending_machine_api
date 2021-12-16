import { USER_ROLES, USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../../infrastructure/constants';



const postBodyRequestSchema = {
    type: 'object',
    required: ['userName', 'password', 'role'],
    properties: {
        userName: { type: 'string', minLength: USERNAME_MIN_LENGTH },
        password: { type: 'string', minLength: PASSWORD_MIN_LENGTH },
        role: { 
            type: 'string',
            enum: [USER_ROLES.BUYER, USER_ROLES.SELLER] 
        }  
    }
}

const putBodyRequestSchema = {
    type: 'object',
    anyOf: [
        {required: ['userName']},
        {required: ["password"]}
        // any other properties, in a similar way
    ],
    properties: {
        userName: { type: 'string', minLength: USERNAME_MIN_LENGTH },
        password: { type: 'string', minLength: PASSWORD_MIN_LENGTH }
    }
}

const depositBodyRequestSchema = {
    type: 'object',
    required: ['amount'],
    properties: {
        amount: { type: 'integer' }
    }
}

export { postBodyRequestSchema, putBodyRequestSchema, depositBodyRequestSchema }