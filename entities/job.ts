// entities/Applicant.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt!: Date;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  dob!: string; // consider changing to Date if needed

  @Column()
  location!: string;

  @Column()
  device!: string;

  @Column()
  internet!: string;

  @Column()
  availability!: string;

  @Column()
  experience!: string;

  @Column()
  s3Url!: string;
}
