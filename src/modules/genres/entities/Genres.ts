import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
  
import { User } from '../../users/entities/User';
import { Game } from '../../games/entities/Game';
  
@Entity('games')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @ManyToMany(() => User, (user) => user.games)
    users: User[];
  
    @ManyToMany(() => Game, (game) => game.orders)
    games: Game[];

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}  