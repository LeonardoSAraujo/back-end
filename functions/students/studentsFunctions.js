const { PrismaClient,Prisma } = require('@prisma/client');
const prisma = new PrismaClient()
const {InvalidArgumentError, InternalServerError,UniqueViolation} = require('../global/error');

async function createStudent(student){
    if(student.id_colegio == '' || student.id_colegio == undefined || student.cpf == undefined || student.cpf == '' || student.id_turma == undefined || student.id_turma == ''){
      throw new InvalidArgumentError(`Campos obrigatórios inválidos`)
    }
    try {
      const creation = await prisma.Students.create({
        data:{
          cpf: student.cpf,
          name: student.name,
          email: student.email,
          id_colegio: parseInt(student.id_colegio),
          id_turma: parseInt(student.id_turma),
          score: student.score?parseFloat(student.score):undefined
        },
      })
      return(creation)
    }  catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            throw new UniqueViolation(`Estudante já cadastrado`)
        }
          throw new InternalServerError(`Erro ao acessar, tente novamente`)
      }
      throw new InternalServerError(`Erro ao cadastrar, tente novamente`)
    }
  }
  
async function searchStudents(params){
    try{
      const userslist = await prisma.Students.findUnique({
        where:{
          id: parseInt(params.id)
        }
      })
      if(!userslist){
        throw new InvalidArgumentError(``)
      }
      return userslist
    }catch(error){
      if(error.name === 'InvalidArgumentError'){
        throw new InvalidArgumentError(`Cadastro não encontrado`)
      }
      throw new InternalServerError(`Erro ao solicitar informações, tente novamente`)
    }
  }

async function listStudents(params){
    try{
      const userslist = await prisma.Students.findMany({
        where: {
          id_turma: params.id_turma?parseInt(params.id_turma):undefined,
          score: params.score?parseFloat(params.score):undefined,
          id_colegio: params.id_colegio?parseInt(params.id_colegio):undefined
        }
      })
      return userslist
    }catch(error){
      throw new InternalServerError(`Erro ao solicitar informações, tente novamente`)
    }
  }
  
async function updateStudent(id,student){
    try {
       await prisma.Students.update({
        where:{
          id: parseInt(id)
        },
        data:{
          cpf: student.cpf,
          name: student.name,
          email: student.email,
          id_colegio: student.id_colegio?parseInt(student.id_colegio):undefined,
          id_turma: student.id_turma?parseInt(student.id_turma):undefined,
          score: student.score?parseFloat(student.score):undefined
        },
      })
      return('Cadastro alterado com sucesso')
    }  catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new InvalidArgumentError(`Usuário não encontrado`)
        }
        throw new InternalServerError(`Erro ao acessar, tente novamente`)
      }
      throw new InternalServerError(`Erro ao cadastrar, tente novamente`)
    }
  }

  async function deleteStudent(id){
    try {
       await prisma.Students.delete({
        where:{
          id: parseInt(id)
        }
      })
      return('Cadastro excluído com sucesso')
    }  catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new InvalidArgumentError(`Usuário não encontrado`)
        }
        throw new InternalServerError(`Erro ao acessar, tente novamente`)
      }
      throw new InternalServerError(`Erro ao cadastrar, tente novamente`)
    }
  }

module.exports = {searchStudents,updateStudent,createStudent,deleteStudent,listStudents}