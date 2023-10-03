import { Attachment } from 'src/attachment/attachment.entity';
import { Gig } from 'src/gig/gig.entity';
import { Message } from "src/message/message.entity";
import { Order } from 'src/order/order.entity';
import { Review } from 'src/review/review.entity';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  saltKey: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @OneToOne(() => Attachment, u => u.user)
  @JoinColumn({ name: "avatarId" })
  avatar?: Attachment;

  @Column({ nullable: true })
  avatarId: string;

  @OneToMany(() => Message, m => m.sender)
  messagesSent: Message[];

  @OneToMany(() => Message, m => m.receiver)
  messagesReceived: Message[];

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  wallet: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @OneToMany(() => Review, review => review.reviewer)
  reviewsSent: Review[];

  @OneToMany(() => Review, review => review.reviewee)
  reviewsReceived: Review[];

  @ManyToMany(() => Gig, gig => gig.usersWhoSaved)
  @JoinTable()
  savedGigs: Gig[];

  @OneToMany(() => Gig, gig => gig.owner)
  gigs: Gig[];

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
