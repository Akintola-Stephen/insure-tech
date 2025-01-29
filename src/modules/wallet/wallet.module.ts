import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';

@Module({
    imports: [SequelizeModule.forFeature([Wallet])],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule { }
