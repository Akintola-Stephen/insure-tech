import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './plan.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Plan]),
    ],
})
export class PlanModule { }
