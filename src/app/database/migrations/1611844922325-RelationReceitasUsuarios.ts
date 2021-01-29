import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationReceitasUsuarios1611844922325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."usuarios" ("id_usuario" SERIAL NOT NULL, "nome_usuario" character varying NOT NULL, "email_usuario" character varying NOT NULL, "senha_usuario" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b732f2ebaec41930c64b3984b4f" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "usuarios_pkey" ON "public"."usuarios" ("id_usuario") `);
        await queryRunner.query(`CREATE TABLE "public"."receitas" ("id_receita" SERIAL NOT NULL, "nome_receita" character varying(255) NOT NULL, "id_usuario" integer, CONSTRAINT "PK_e53a70c75e18f1f6845a8cc1636" PRIMARY KEY ("id_receita"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "receitas_pkey" ON "public"."receitas" ("id_receita") `);
        await queryRunner.query(`ALTER TABLE "public"."receitas" ADD CONSTRAINT "FK_da75cf9c09e05bf7656e42c4a5a" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."receitas" DROP CONSTRAINT "FK_da75cf9c09e05bf7656e42c4a5a"`);
        await queryRunner.query(`DROP INDEX "public"."receitas_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."receitas"`);
        await queryRunner.query(`DROP INDEX "public"."usuarios_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios"`);
    }

}
