# Instalação
-- Altere o link da database no arquivo .env e utilize o header Authorization com o token em suas requisições

```bash
npm install
npx prisma generate
npm start
```
# Utilização e rotas

- criação de cadastro POST: localhost:3000/students
- listagem de cadastros GET: localhost:3000/students?id_turma=&score=&id_colegio= // variaveis id_turma= Int score= Float id_colegio= Int
- edição de cadastro PUT localhost:3000/students/{ID} 
- consultar cadastro GET: localhost:3000/students/{ID} 
- deletar cadastro DELETE: localhost:3000/students/{ID} 
