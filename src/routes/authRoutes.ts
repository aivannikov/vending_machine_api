import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { signInRequestSchema } from './validationSchemas/authRequestSchemas';
import { signInHandler } from '../handlers/authHandlers';

const routesOptions = {
    SignInRoute: {
        schema: {
            body: signInRequestSchema
        }
    }
}

const authRoutes = async (app: FastifyInstance, opts: RouteShorthandOptions, done: Function) => { 
    app.post("/signIn", routesOptions.SignInRoute, await signInHandler);
    done();
  };

  export default authRoutes;  