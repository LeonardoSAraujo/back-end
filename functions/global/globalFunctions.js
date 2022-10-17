
const {InvalidArgumentError} = require('./error');

function authenticate(token){
    if(token === process.env.TOKEN){
      return
    }else{
      throw new InvalidArgumentError(`Token inválido`);
    }
  }

module.exports = {authenticate}