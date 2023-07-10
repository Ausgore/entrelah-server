import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DeleteResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  deleteUserById(id: string): Promise<DeleteResult> {
    return this.userRepo.delete({ id });
  }

  getUsers(where?: FindOptionsWhere<User>): Promise<User[]> {
    return this.userRepo.find({ where });
  }

  getUserById(id: string): Promise<User> {
    return this.getUserBy({ id });
  }

  getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    return this.userRepo.findOne({ where });
  }
}
