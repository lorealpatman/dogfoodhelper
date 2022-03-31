import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './Order-Item';

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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  get name(): string {
    return `${this.name}`;
  }

  get total(): number {
    return this.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }
}
