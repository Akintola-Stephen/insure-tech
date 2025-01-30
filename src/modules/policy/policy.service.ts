import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Plan } from '../plan/plan.model';
import { PendingPolicy } from '../policy/policy.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.model';


@Injectable()
export class PolicyService {
    constructor(
        @InjectModel(Plan) private planModel: typeof Plan,
        @InjectModel(PendingPolicy) private pendingPolicyModel: typeof PendingPolicy,
        @InjectModel(User) private userModel: typeof User, // Injected the User model to fetch user details
    ) { }

    //  Get list of pending policies under a plan
    async getPendingPolicies(planId: number) {
        const pendingPolicies = await this.pendingPolicyModel.findAll({
            where: { planId, status: 'unused' },  // Filter by planId and unused status
            include: [
                {
                    model: Plan,
                    attributes: ['id', 'planName', 'totalAmount']
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (pendingPolicies.length === 0) {
            throw new NotFoundException('No pending policies found for this plan.');
        }

        return pendingPolicies;
    }


    //  Activate a pending policy (soft delete and create a policy)
    async activatePendingPolicy(userId: number, planId: number) {

        const pendingPolicy = await this.pendingPolicyModel.findOne(
            {
                where: { userId, planId, status: 'unused' }
            }
        );

        if (!pendingPolicy) {
            throw new NotFoundException('Pending policy not found or already used.');
        }

        // Generate a policy number using UUID
        const policyNumber = `Policy-${uuidv4()}PPL`;

        pendingPolicy.status = 'used';
        pendingPolicy.policyNumber = policyNumber;
        await pendingPolicy.save();

        const plan = await this.planModel.findByPk(planId);

        const user = await this.userModel.findByPk(userId);

        return {
            message: 'Policy activated successfully.',
            policy: {
                id: pendingPolicy.id,
                policyNumber: pendingPolicy.policyNumber,
                userId: pendingPolicy.userId,
                planId: pendingPolicy.planId,
                status: 'used',
            },
            user: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
            },
            plan: {
                id: plan?.id,
                name: plan?.planName,
                totalAmount: plan?.totalAmount,
            },
        };
    }

    // List of activated policies under a plan with detailed information
    async getActivatedPolicies(planId?: number) {
        const whereConditions: any = { status: 'used' };

        // Add planId condition if provided
        if (planId) {
            whereConditions.planId = planId;
        }

        const activatedPolicies = await this.pendingPolicyModel.findAll({
            where: whereConditions,
            include: [
                {
                    model: Plan,
                    attributes: ['id', 'planName', 'totalAmount']
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (activatedPolicies.length === 0) {
            throw new NotFoundException('No activated policies found.');
        }

        return activatedPolicies;
    }


}
