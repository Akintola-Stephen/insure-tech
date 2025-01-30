import { Controller, Get, Post, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
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

    @Get('activated')
    async getActivatedPolicies(
        @Query('planId') planId?: number, // Make planId optional here
    ) {
        return await this.policyService.getActivatedPolicies(planId);
    }
}
