import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { PlanModule } from './modules/plan/plan.module';
import { PolicyModule } from './modules/policy/policy.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [ProductModule, ProductCategoryModule, PlanModule, PolicyModule, UserModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
