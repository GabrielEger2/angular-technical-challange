export class UserModel {
    name: string;
    email: string;
    gender: string;
    status: boolean;

    constructor() {
        this.name = '';
        this.email = '';
        this.gender = '';
        this.status = false;
    }
}