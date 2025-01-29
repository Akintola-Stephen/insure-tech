import { Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class WalletService {
    constructor(@InjectModel(Wallet) private walletModel: typeof Wallet) { }

    async createWallet(userId: number) {
        return this.walletModel.create({ userId });
    }


    async walletTopUp(userId: number, amount: number) {
        const wallet = await this.walletModel.findOne({ where: { userId } });
        if (!wallet) throw new Error("Wallet not found for user");
        wallet.balance += amount;
        await wallet.save();
        return wallet;
    }

}