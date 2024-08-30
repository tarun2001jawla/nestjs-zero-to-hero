import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User)) as jest.Mocked<Repository<User>>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
  });

  describe('signup', () => {
    it('should hash the password and save the user', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = 'hashedpassword';
      const user: User = { id: 1, email, password: hashedPassword } as User;

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);

      expect(await userService.signup(email, password)).toEqual(user);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(userRepository.create).toHaveBeenCalledWith({ email, password: hashedPassword });
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('validateUser', () => {
    it('should return user if password is valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = 'hashedpassword';
      const user: User = { id: 1, email, password: hashedPassword } as User;

      userRepository.findOneBy.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      expect(await userService.validateUser(email, password)).toEqual(user);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return null if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = 'hashedpassword';
      const user: User = { id: 1, email, password: hashedPassword } as User;

      userRepository.findOneBy.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      expect(await userService.validateUser(email, password)).toBeNull();
    });

    it('should return null if user is not found', async () => {
      const email = 'test@example.com';
      const password = 'password';

      userRepository.findOneBy.mockResolvedValue(null);

      expect(await userService.validateUser(email, password)).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user: User = { id: 1, email: 'test@example.com', isAdmin: false } as User;
      const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
      const token = 'jwt-token';

      jwtService.sign.mockReturnValue(token);

      expect(await userService.login(user)).toEqual({ access_token: token });
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });
});