import { Controller, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policies')
export class PolicyController {
    constructor(private readonly policyService: PolicyService) { }

    // Get list of pending policies under a plan
    @Get('pending/:planId')
    async getPendingPolicies(@Param('planId', ParseIntPipe) planId: number) {
        return await this.policyService.getPendingPolicies(planId);
    }

    // Activate a pending policy
    @Post('activate')
    async activatePendingPolicy(
        @Body('userId', ParseIntPipe) userId: number,
        @Body('planId', ParseIntPipe) planId: number,
    ) {
        return await this.policyService.activatePendingPolicy(userId, planId);
    }

    // Get all activated policies (optional filter by plan)
    // @Get('activated')
    // async getActivatedPolicies(@Body('planId') planId?: number) {
    //     return await this.policyService.getActivatedPolicies(planId);
    // }
}
