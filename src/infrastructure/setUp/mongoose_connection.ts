import mongoose  from 'mongoose';
import mongo_config from '../../config/mongo_config';

const connectionString = `mongodb+srv://${ mongo_config.login }:${ mongo_config.password }@${ mongo_config.url }/${ mongo_config.db_name }?retryWrites=true&w=majority`

let func = () => {
    func = () => {};
    mongoose.connect(connectionString, {
         useNewUrlParser: true, 
         useUnifiedTopology: true
        });

// CONNECTION EVENTS
// When successfully connected

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + connectionString);
  }); 
    
  // If the connection throws an error
  mongoose.connection.on('error',function (err) { 
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () { 
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });
}   
 
 const startMongoose = func;
 export default startMongoose;