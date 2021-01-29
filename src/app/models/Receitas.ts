import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("receitas_pkey", ["id_receita"], { unique: true })
@Entity("receitas", { schema: "public" })
export class Receitas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_receita" })
  id_receita: number;

  @Column("character varying", { name: "nome_receita", length: 255 })
  nome_receita: string;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.receitas)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id_usuario" }])
  id_usuario: Usuarios;
}
