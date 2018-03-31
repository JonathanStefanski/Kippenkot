import { Roles, Gender } from '../shared/constants';

interface IUser {
    id: string;
    userName: string;
    roles: Roles[];
    email: string;
    gender: Gender;
    locked: boolean;
}

export class User implements IUser {
    constructor(obj: IUser) {
        this.id = obj.id;
        this.userName = obj.userName;
        this.roles = obj.roles;   
        this.email = obj.email;   
        this.gender = obj.gender;        
    }

    public id: string;
    public userName: string;
    public roles: Roles[];  
    public locked: boolean;
    public email: string;
    public gender: Gender;

    // New static method.
    static fromJSONArray(array: Array<IUser>): User[] {        
        return array.map(obj => new User(obj));
    }

    isInRole(role: Roles): boolean {
        return this.roles.map(r => r.toLowerCase()).indexOf(role.toLowerCase()) >= 0;
    }
}

