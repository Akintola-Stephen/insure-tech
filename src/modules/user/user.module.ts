import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from '../wallet/wallet.model';
import { Product } from '../product/product.model';
import { ProductPurchaseOrder } from '../product/product-purchase-order.model';
import { PendingPolicy } from '../policy/policy.model';
import { Plan } from '../plan/plan.model';

@Module({
    imports: [
        SequelizeModule.forFeature([User, Wallet, Product, ProductPurchaseOrder, Plan, PendingPolicy]),
        WalletModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }

