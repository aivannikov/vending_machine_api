import { createUserHandler } from "../../../src/handlers/userHandlers";
import { UserModel, User_Fields } from "../../../src/data/mongo/documents/UserDocument";
import fastify, { FastifyInstance, RouteShorthandOptions, FastifyRequest, FastifyReply } from 'fastify';
import mongoose, { Document } from 'mongoose';



beforeAll(() => {
    jest.spyOn(UserModel.prototype, 'save').mockImplementation(() => 'Hello');
    //jest.spyOn(FastifyRequest.prot, 'body').mockImplementation(() => 'Hello');

    
});

afterAll(() => {
    jest.restoreAllMocks();
});

// test('Modify class', () => {
//     let request = {body: {userName: "vasia", password: "Pupkin"}} as FastifyRequest;
//     let response = {} as FastifyReply;
//     var createUserHandler(request, response);
//     let person = new Person('Lorem', 'Ipsum');
//     expect(person.sayMyName()).toBe("Hello");
//     expect(person.bla()).toBe("bla");
// });