import { EntityRepository, Repository } from 'typeorm';

// entities
import { Role } from './role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
