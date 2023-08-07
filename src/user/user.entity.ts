import { Gig } from 'src/gig/gig.entity';
import { Review } from 'src/review/review.entity';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  wallet: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @OneToMany(() => Review, review => review.reviewer)
  reviewsSent: Review[];

  @OneToMany(() => Review, review => review.reviewee)
  reviewsReceived: Review[];

  @OneToMany(() => Gig, gig => gig.owner)
  gigs: Gig[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
