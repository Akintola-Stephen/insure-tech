import { BadRequestException, Body, Controller, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Post("create-user")
    async createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Post("purchase-products/:userId")
    async purchaseProducts(
        @Param("userId") userId: number,
        @Body() body: { productIds: { productId: number; quantity: number }[] }
    ) {
        return this.userService.purchaseProducts(userId, body);
    }
}