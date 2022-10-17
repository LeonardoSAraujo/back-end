-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "id_colegio" INTEGER NOT NULL,
    "id_turma" INTEGER NOT NULL,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_id_key" ON "Students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_cpf_key" ON "Students"("cpf");
