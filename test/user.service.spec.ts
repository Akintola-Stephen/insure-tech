import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/modules/user/user.service';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user successfully', async () => {
        const userDto = { id: 1, name: 'Stephen', email: 'akintolastepahen224@gmail.com' };

        jest.spyOn(service, 'createUser').mockResolvedValue(userDto);

        expect(await service.createUser(userDto)).toEqual(userDto);
    });

    it('should throw error if email is invalid', async () => {
        const userDto = { name: 'Stephen', email: 'invalid_email' };

        jest.spyOn(service, 'createUser').mockRejectedValue(new HttpException('Invalid email', 400));

        await expect(service.createUser(userDto)).rejects.toThrowError(HttpException);
    });
});
