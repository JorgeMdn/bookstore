import { EntityRepository, Repository } from 'typeorm';

// entities
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
