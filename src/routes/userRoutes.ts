
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { createUserHandler, updateUserHandler, deleteUserHandler, depositHandler  } from '../handlers/userHandlers';
import { postBodyRequestSchema, putBodyRequestSchema, depositBodyRequestSchema} from './validationSchemas/userRequestSchemas';
import { checkAuthorization } from '../infrastructure/auth/utils';
import { USER_ROLES } from '../infrastructure/constants';



const userRoutes = async (app: FastifyInstance, opts: RouteShorthandOptions, done: Function) => { 

  const routesOptions = {
  
    POST: {
      schema: {
        body: postBodyRequestSchema
      },
      preHandler: [checkAuthorization]
    },
  
    PUT: {
      schema: {
        body: putBodyRequestSchema
      },
      preHandler: [checkAuthorization]
    },
    DELETE: {
      preHandler: [checkAuthorization]
    },
    DEPOSIT: {
      schema: {
        body: depositBodyRequestSchema
      },
      preHandler: [checkAuthorization, app.guard.role(USER_ROLES.BUYER)]
    }
  }



    app.post("/user", routesOptions.POST, await createUserHandler);
    app.put("/user", routesOptions.PUT, await updateUserHandler);
    app.delete("/user", routesOptions.DELETE,  await deleteUserHandler);
    app.post('/deposit', routesOptions.DEPOSIT, await depositHandler)
    done();
  };

export default userRoutes;
  