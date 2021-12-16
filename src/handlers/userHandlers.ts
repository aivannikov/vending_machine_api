import fastify, { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply } from 'fastify';
import JWTUser from '../infrastructure/auth/JWTUser';
import { UserModel, User_Fields }  from '../data/mongo/documents/UserDocument';
import { createOrUpdateExpression } from '../data/mongo/mongo_utils';
import UserRequestModel from '../models/request_models/UserRequestModel';
import { passwordHash } from '../infrastructure/general_utils/password_utils';

import { Document } from 'mongoose';

type Deposit = { amount: number }

const createUserHandler = async (request: FastifyRequest, response: FastifyReply) => {
        
    const reqUser = request.body as UserRequestModel;
    
    const userModel = new UserModel({
        userName: reqUser.userName,
        password: await passwordHash(reqUser.password),
        role: reqUser.role
    });
    let createdUserDoc = new UserModel();
    try {
        const userExistsfilter = createOrUpdateExpression(User_Fields.User_Name, reqUser.userName);
        if(! await UserModel.exists( userExistsfilter )) 
            createdUserDoc = await userModel.save();
        else
            response.code(422)
                .send({ message: `User wasn\'t created as userName ${reqUser.userName} already exists` })

    }
    catch(ex) {
        console.log(ex)
        response.code(500)
            .send({ message: 'Something went wrong with mongo server' })
    }
    
    response.code(201).send({
        id: createdUserDoc.id,
        userName: createdUserDoc.get("userName"),
        role: createdUserDoc.get("role")
    });
}

const updateUserHandler = async (request: FastifyRequest, response: FastifyReply) => {
    const reqUser = request.body as UserRequestModel;

    const findAndUpdateFilter = createOrUpdateExpression(User_Fields.User_Name, (request.user as JWTUser).userName);
    let updateExpression = {};
    if(reqUser.userName)
        updateExpression = createOrUpdateExpression(User_Fields.User_Name, reqUser.userName);
    if(reqUser.password)
        updateExpression = createOrUpdateExpression(User_Fields.Password,  await passwordHash(reqUser.password), updateExpression);
    let  doc = null
    try{
        doc = await UserModel.findOneAndUpdate(findAndUpdateFilter, updateExpression);
        if(!doc)
            response.code(422)
                .send({ message: 'User wasn\'t updated' }) 
                
    } catch(ex){
        response.code(500)
            .send({ message: 'Something went wrong with mongo server' })
    }
   response.code(200).send(doc);
} 

const deleteUserHandler = async (request: FastifyRequest, response: FastifyReply) => {
    
    const currentUserName = (request.user as JWTUser).userName
    try {
        const deleteFilter = createOrUpdateExpression(User_Fields.User_Name, currentUserName);
        const deleteResult =  await UserModel.deleteOne( deleteFilter )
        if(deleteResult.ok === 1) 
            response.code(200).send({message: `User with the userName ${ currentUserName } was deleted`});
         else
            response.code(422)
                .send({ message: `User wasn\'t deleted. userName ${currentUserName}` })    
    }
    catch(ex) {
        response.code(500)
            .send({ message: 'Something went wrong with mongo server' })
    }
}

const depositHandler = async (request: FastifyRequest, response: FastifyReply) => {
    const amount = (request.body as Deposit).amount;
    const currentUserName = (request.user as JWTUser).userName
    const findAndUpdateFilter = createOrUpdateExpression(User_Fields.User_Name, currentUserName);
    const updateExpression = createOrUpdateExpression(User_Fields.Deposit, amount);
    let doc = null
    try{
        doc = await UserModel.findOneAndUpdate(findAndUpdateFilter, updateExpression);
        if(!doc)
            response.code(422)
                .send({ message: 'User wasn\'t updated' }) 
                
    } catch(ex){
        response.code(500)
            .send({ message: 'Something went wrong with mongo server' })
    }
    response.code(200).send(doc);

}

export  { createUserHandler, updateUserHandler, deleteUserHandler, depositHandler }