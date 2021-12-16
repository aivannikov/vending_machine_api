
class UserRequestModel {
    userName: string;
    password: string;
    role: string;

    constructor(username: string, password: string, role: string) {
        this.userName = username;
        this.password = password;
        this.role = role;
    }
}

export default UserRequestModel;