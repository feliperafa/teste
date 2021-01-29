import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Receitas } from "./Receitas";

@Index("usuarios_pkey", ["id_usuario"], { unique: true })
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  id_usuario: number;

  @Column("character varying", { name: "nome_usuario" })
  nome_usuario: string;

  @Column("character varying", { name: "email_usuario" })
  email_usuario: string;

  @Column("character varying", { name: "senha_usuario" })
  senha_usuario: string;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  created_at: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updated_at: Date | null;

  @OneToMany(() => Receitas, (receitas) => receitas.id_usuario)
  receitas: Receitas[];
}
