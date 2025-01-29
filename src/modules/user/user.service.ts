import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        
        private walletService: WalletService
    ) { }

    async createUser(userDto: any) {
        const user = await this.userModel.create(userDto);
        await this.walletService.createWallet(user.id);
        return user;
    }
}