export class UserModel {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: boolean;

    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.gender = '';
        this.status = false;
    }
}