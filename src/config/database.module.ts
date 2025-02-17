import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from '../modules/product/product.model';
import { User } from '../modules/user/user.model';
import { ProductCategory } from '../modules/product-category/product-category.model';
import { Wallet } from '../modules/wallet/wallet.model';
import { ProductPurchaseOrder } from '../modules/product/product-purchase-order.model';
import { Plan } from '../modules/plan/plan.model';
import { PendingPolicy } from '../modules/policy/policy.model';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const isProduction = configService.get<string>('NODE_ENV') === 'production';

                return {
                    dialect: 'postgres',
                    host: configService.get('DB_HOST', isProduction ? process.env.DB_HOST : 'localhost'),
                    port: Number(configService.get('DB_PORT', isProduction ? process.env.DB_PORT : 5432)),
                    username: configService.get('DB_USER', isProduction ? process.env.DB_USER : 'postgres'),
                    password: configService.get('DB_PASSWORD', isProduction ? process.env.DB_PASSWORD : '1234'),
                    database: configService.get('DB_NAME', isProduction ? process.env.DB_NAME : 'INSURE-TECH'),
                    models: [Product, ProductCategory, Wallet, User, ProductPurchaseOrder, Plan, PendingPolicy],
                    autoLoadModels: true,
                    synchronize: true,
                    dialectOptions: isProduction
                        ? {
                              ssl: {
                                  required: true,
                                  rejectUnauthorized: false,
                              },
                          }
                        : {},
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
