import { Controller, Post, Body, Param } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Post('topUp/:userId')
    async walletTopUp(
        @Param('userId') userId: number,
        @Body('amount') amount: number
    ) {
        const updatedWallet = await this.walletService.walletTopUp(userId, amount);
        return updatedWallet;
    }
}
