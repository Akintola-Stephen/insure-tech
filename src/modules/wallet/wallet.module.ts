import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';
import { WalletController } from './wallet.controller';

@Module({
    imports: [SequelizeModule.forFeature([Wallet])],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule { }
