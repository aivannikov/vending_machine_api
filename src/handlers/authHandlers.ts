import  { FastifyRequest, FastifyReply } from 'fastify';
import { UserModel, User_Fields }  from '../data/mongo/documents/UserDocument';
import { createOrUpdateExpression } from '../data/mongo/mongo_utils';
import { passwordCompare } from '../infrastructure/general_utils/password_utils';
import JWTUser from '../infrastructure/auth/JWTUser';


const signInHandler = async (request: FastifyRequest, response: FastifyReply) => {
    const inputCredentials =  request.body as {userName: string, password: string };
     
    const searchCredentialsFilter = createOrUpdateExpression(User_Fields.User_Name, inputCredentials.userName);
    
    const userDoc = await UserModel.findOne(searchCredentialsFilter);

    if( userDoc && await passwordCompare( inputCredentials.password, userDoc.get(User_Fields.Password) ) ) {
        const usr:JWTUser = { 
            userName: userDoc.get(User_Fields.User_Name),
            role: [userDoc.get(User_Fields.Role)]
        }

        const token = request.server.jwt.sign(usr);
        response.code(200).send(token);
    }
    else
        response.code(422)
            .send({ message: 'No user with these credentials' })
    
}

export { signInHandler };