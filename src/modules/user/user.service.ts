import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { WalletService } from "../wallet/wallet.service";
import { Wallet } from "../wallet/wallet.model";
import { Product } from "../product/product.model";
import { ProductPurchaseOrder } from "../product/product-purchase-order.model";
import { Plan } from "../plan/plan.model";
import { PendingPolicy } from "../policy/policy.model";
import { CreateUserDto, UserResponseDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Wallet) private walletModel: typeof Wallet,
        @InjectModel(Product) private productModel: typeof Product,
        @InjectModel(ProductPurchaseOrder) private productPurchaseOrder: typeof ProductPurchaseOrder,
        @InjectModel(Plan) private planModel: typeof Plan,
        @InjectModel(PendingPolicy) private policyModel: typeof PendingPolicy,
        private walletService: WalletService
    ) { }

    async createUser(userDto: CreateUserDto): Promise<UserResponseDto> {
        // Check if the email already exists
        const existingUser = await this.userModel.findOne({ where: { email: userDto.email } });
        if (existingUser) {
            throw new BadRequestException('Email is already in use.');
        }

        // Create the user
        const user = await this.userModel.create({
            name: userDto.name,
            email: userDto.email,
        });

        // Initialize the user's wallet
        await this.walletService.createWallet(user.id);

        // Fetch the user with relationships included
        const createdUser = await this.userModel.findByPk(user.id, {
            include: ['wallet', 'products', 'plans'],
        });

        if (!createdUser) {
            throw new NotFoundException('User not found after creation.');
        }

        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            wallet: createdUser.wallet
                ? { id: createdUser.wallet.id, balance: createdUser.wallet.balance }
                : undefined,
            products: createdUser.products?.map((product) => ({
                id: product.id,
                productName: product.productName,
                productAmount: product.productAmount,
            })) || [],
            plans: createdUser.plans?.map((plan) => ({
                id: plan.id,
                totalAmount: plan.totalAmount,
                plan: plan.planName
            })) || [],
        };
    }

    async purchaseProducts(userId: number, data: { productIds: { productId: number; quantity: number }[] }) {
        // Start a new transaction
        const transaction = await this.userModel.sequelize?.transaction();
        let hasError = false;

        try {
            const user = await this.userModel.findByPk(userId, { include: [Wallet], transaction });
            if (!user) throw new BadRequestException("User not found");

            const wallet = user.wallet;
            if (!wallet) throw new BadRequestException("Wallet not found");

            if (!data || !Array.isArray(data.productIds)) {
                throw new BadRequestException("Invalid productIds format. Expected an array.");
            }

            const { productIds } = data;

            let totalAmount = 0;

            // Check each product and calculate total amount
            for (const { productId, quantity } of productIds) {
                const product = await this.productModel.findByPk(productId, { transaction });
                if (!product) throw new BadRequestException(`Product with ID ${productId} not found`);
                totalAmount += product.productAmount * quantity;
            }

            if (wallet.balance < totalAmount) {
                throw new BadRequestException("Insufficient wallet balance to purchase product. Please kindly top up.");
            }

            // Deduct from wallet within the transaction
            wallet.balance -= totalAmount;
            await wallet.save({ transaction });

            // Save purchases in ProductPurchaseOrder only if it doesn't exist already
            for (const { productId, quantity } of productIds) {
                const existingOrder = await this.productPurchaseOrder.findOne({
                    where: { userId, productId },
                    transaction
                });

                // If order already exists, skip creation
                if (!existingOrder) {
                    await this.productPurchaseOrder.create({ userId, productId }, { transaction });
                }
            }

            // Generate a unique plan name
            const planName = `Plan-${uuidv4()}`;
            

            // Create a new plan within the transaction
            const plan = await this.planModel.create({ userId, totalAmount, planName }, { transaction });

            // Create a pending policy for the user within the transaction
            const policy = await this.policyModel.create({ planId: plan.id, status: 'unused', userId: userId }, { transaction });

            // Fetch the updated user details with wallet and purchases
            const updatedUser = await this.userModel.findByPk(userId, {
                include: [
                    { model: Wallet },
                ],
                transaction,
            });

            // Commit the transaction
            await transaction?.commit();

            return {
                message: "Purchase successful",
                data: {
                    user: {
                        id: updatedUser?.id,
                        name: updatedUser?.name,
                        walletBalance: new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(updatedUser?.wallet?.balance ?? 0),
                    },
                    plan: {
                        id: plan.id,
                        name: plan.planName,
                        totalAmount: plan.totalAmount,
                    },
                    policy: {
                        id: policy.id,
                        status: policy.status,
                    },
                },
                status: true

            };
        } catch (error) {
            hasError = true;
            // Ensure rollback happens only if the transaction hasn't been committed
            if (transaction && hasError) {
                await transaction.rollback();
            }
            return { message: error.message || "An error occurred", status: false };
        }
    }


}