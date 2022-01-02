import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.query(`
      SELECT
        u.first_name,
        u.last_name,
        u.email,
        array_agg(json_build_object('title', g.title)) games
      FROM users u
      RIGHT JOIN games g ON u.id = '${user_id}'
      GROUP BY u.first_name, u.last_name, u.email
    `);
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY first_name');
  } 

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`
      SELECT * 
      FROM users 
      WHERE (
        LOWER(first_name) LIKE LOWER('%${first_name}%')
        AND
        LOWER(last_name) LIKE LOWER('%${last_name}%')
      )
    `);
  }
}
