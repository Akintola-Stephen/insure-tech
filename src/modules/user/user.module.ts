import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        WalletModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }

