const Joi = require("joi");
const { executeSqlQuery } = require("../database/sql");

class User {

  userid;
  userName;
  email;
  password;
  phone;

  constructor(obj) {
      if(obj.userid) this.userid = obj.userid;
      this.userName = obj.userName;
      this.email = obj.email;
      this.password = obj.password;
      this.phone = obj.phone;
  }

  static async getUserById(_userid) {
    const query = `SELECT * from users where userid = "${_userid}";`;
    const res = await executeSqlQuery(query);
    if(res[0]) return new User(res[0]);
    return false;
  }

  static async getUserByCredential(_email, _password){
    const query = `SELECT * from users where email = "${_email}";`;
    const res = await executeSqlQuery(query);
    if(res[0]) return new User(res[0]);
    return false;
  }

  async checkUserExist() {
    const query = `SELECT email from users where email = "${this.email}";`;
    const user = await executeSqlQuery(query);
    if (user.length === 0) return false;
    return true;
  }

  async createUser(){
    const query = `insert into users (email,username,password,phone) 
    values ("${this.email}","${this.userName}","${this.password}","${this.phone}");`;
    const res = await executeSqlQuery(query);
    console.log(res);
  }

}


//Helper Functions

const schema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
  
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  
    repeat_password: Joi.ref("password"),
    phone: Joi.string().min(10).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "io", "org", "edu"] },
      })
      .required(),
});

function validateCreateRequest({ userName, email, password, phone, repeat_password }) {
  return schema.validate({
    userName,
    email,
    password,
    phone,
    repeat_password,
  });
}



exports.validateCreateRequest = validateCreateRequest;

exports.User = User;