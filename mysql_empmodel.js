class EmpModel {
  constructor(db) {
    this.db = db;
  }

  async addEmp(data, condition) {
    const existingUser = await this.db.read('Employees', { EmpName: data.empname }, condition);
   
    if (existingUser.length > 0) {
      return { message: "User already exists" };
    }
    return await this.db.write('Employees', data);
  }

  async getEmp(data = [], condition = '') {
    return await this.db.read('Employees', data, condition);
  }

  async removeEmp(condition = '') {
    return await this.db.remove('Employees', condition);
  }

  async updateEmp(empname, data) {
    return await this.db.update('Employees', empname, data);
  }
}

module.exports = EmpModel;
