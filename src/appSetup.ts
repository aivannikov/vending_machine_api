import { FastifyInstance } from 'fastify';
import dotenv from 'dotenv'
import routesRegistration from './infrastructure/setUp/routesRegistration';
import authRegistration from './infrastructure/setUp/authRegistration';
import startMongoose from './infrastructure/setUp/mongoose_connection';

let func = (app: FastifyInstance ) => {
    // make call it once
    func = () => {}
    dotenv.config();
    // authregistration should be before routesRegistration 
    authRegistration(app);
    routesRegistration(app);
    startMongoose();
}

const appSetup = func;
export default appSetup