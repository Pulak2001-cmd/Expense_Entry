import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOneOptions,
  In,
  IsNull,
  LessThan,
  MoreThan,
  Not,
  Repository,
} from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const createUser = this.userRepository.create({ ...dto });
      await this.userRepository.save(createUser);

      return { message: 'User Created', httpStatus: HttpStatus.OK };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        `Can't create user for : ${err.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOneUserBy(options: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }
}
