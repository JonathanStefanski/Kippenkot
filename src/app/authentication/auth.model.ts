import { Gender } from '../shared/constants';

interface IUser {
    id: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    roles: string[];
}

export class User implements IUser {    
    constructor (
        public id: string,
        public access_token: string, 
        public token_type: string, 
        public expires_in: number, 
        public userName: string,
        public roles: string[]        
    ) { }
}

export class RegisterBindingModel {
    constructor (
        public username: string, 
        public gender: Gender, 
        public email: string, 
        public password: string,
        public confirmPassword: string  
    ) { }
}
