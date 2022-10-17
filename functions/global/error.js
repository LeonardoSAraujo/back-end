class InvalidArgumentError extends Error {
    constructor(mensagem) {
      super(mensagem);
      this.name = 'InvalidArgumentError';
    }
  }
  
  class InternalServerError extends Error {
    constructor(mensagem) {
      super(mensagem);
      this.name = 'InternalServerError';
    }
  }

  class UniqueViolation extends Error {
    constructor(mensagem) {
      super(mensagem);
      this.name = 'UniqueViolation';
    }
  }
  
  module.exports = { InvalidArgumentError, InternalServerError, UniqueViolation };
  