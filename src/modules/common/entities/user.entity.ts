import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("USER_M")
export class User {
  @PrimaryColumn({name: 'USER_ID'})
  id: number;

  @Column({ name: 'USER_NAME',length: 100 })
  name: string;
}