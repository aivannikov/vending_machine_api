import { FastifyInstance } from 'fastify';
import userRoutes from '../../routes/userRoutes';
import authRoutes from '../../routes/authRoutes';

let func = (app: FastifyInstance): void => {
    func = () =>{}
    const apiPrefix = "/api";
    app.register( authRoutes, { prefix: apiPrefix });        
    app.register( userRoutes, { prefix: apiPrefix });
}
const registerRoutes = func;
export default registerRoutes;