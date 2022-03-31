import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productTitle: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
