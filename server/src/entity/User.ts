import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../entity/Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Order, (order) => order.user)
  order: Order;
}
