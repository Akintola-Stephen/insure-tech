import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PendingPolicy } from './policy.model';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { Plan } from '../plan/plan.model';
import { User } from '../user/user.model';

@Module({
    imports: [
        SequelizeModule.forFeature([PendingPolicy, Plan, User]),
    ],
    controllers: [PolicyController],
    providers: [PolicyService],
    exports: [PolicyService]

})
export class PolicyModule { }
