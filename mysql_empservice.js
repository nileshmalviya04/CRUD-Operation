const EmpModel = require('./mysql_empmodel');

class EmpService extends EmpModel {
  constructor(db) {
    super(db); 
  }
}

module.exports = EmpService;
