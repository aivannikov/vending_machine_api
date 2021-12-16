import mongoose  from 'mongoose';
import { USER_ROLES, USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../../../infrastructure/constants';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        min: USERNAME_MIN_LENGTH
    },
    password: {
        type: String,
        min: PASSWORD_MIN_LENGTH
    },
    role: {
        type: String,
        enum: [USER_ROLES.BUYER, USER_ROLES.SELLER] 
    },
    deposit: {
        type: Number
    }
  });
 
 const User_Fields = {
    User_Name: 'userName',
    Password: 'password',
    Role: 'role',
    Deposit: 'deposit'
 }  

 const UserModel = mongoose.model('users', userSchema); 
 export { UserModel, User_Fields };