import fastify from 'fastify'
import fastifyGuard from 'fastify-guard';
import JWTUser from './infrastructure/auth/JWTUser'
import appSetup from './appSetup';
const app = fastify()
appSetup(app);

// app.post('/signup', (req, reply) => {
  
  
// }) 

// app.addHook("onRequest", async (request, reply) => {
//   try {
//     await request.jwtVerify()
//   } catch (err) {
//     reply.send(err)
//   }
// })



// app.get('/ping', {preHandler: [app.guard.role(['seller'])]}, async (request, reply) => {
//   return 'pongfdffsklquiwrw\n'
// })

app.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})