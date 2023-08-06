// đây là model gửi đi

import { User } from "../user.entity";

export class UserRegisterRequestDTO extends User {
    confirmPassword: string;
}