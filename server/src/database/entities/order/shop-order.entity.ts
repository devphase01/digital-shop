import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Address } from '../user/user-address.entity';
import { OrderLine } from './order-line.entity';

@Entity({ name: 'orders' })
export class UserOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderDate: Date;

  @Column()
  orderTotal: number;

  @Column()
  orderStatus: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  products: OrderLine[];

  @ManyToOne(() => Address)
  @JoinTable()
  shippingAddress: Address;
}
