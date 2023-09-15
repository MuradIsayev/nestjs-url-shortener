import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 2048, type: 'varchar' })
  longUrl: string;

  @Column({ unique: true, length: 64, type: 'varchar' })
  shortUrl: string;

  @Column({ unique: true, length: 64, type: 'varchar' })
  urlKey: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
}
