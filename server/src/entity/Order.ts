import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './Order-Item';
import { User } from '../entity/User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: string;

  @OneToOne(() => User, (user) => user.order)
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  get total(): number {
    return this.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }
}
