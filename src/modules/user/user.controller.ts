import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
    constructor(private userService: UserService){}

    @Post("create-user")
    async createUser(@Body() userDto: any ){
        return this.userService.createUser(userDto);
    }
}