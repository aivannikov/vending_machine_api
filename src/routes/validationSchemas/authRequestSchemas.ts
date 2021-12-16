import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../../infrastructure/constants';

const signInRequestSchema = {
    type: 'object',
    required: ['userName', 'password'],
    properties: {
        userName: { type: 'string', minLength: USERNAME_MIN_LENGTH },
        password: { type: 'string', minLength: PASSWORD_MIN_LENGTH }  
    }
}

export { signInRequestSchema }