export class postModel {
    id: number;
    user_id: number;
    title: string;
    body: string;
    user: string;

    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.title = '';
        this.body = '';
        this.user = '';
    }
}