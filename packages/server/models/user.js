const Joi = require("joi");
const { executeSqlQuery } = require("../database/sql");
const bcrypt = require("bcrypt");

const schema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  repeat_password: Joi.ref("password"),
  phone: Joi.string().min(10).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in", "io", "org", "edu"] },
    })
    .required(),
});

async function getUserById(userid) {
  const query = `SELECT * from users where userid = "${userid}";`;
  const res = await executeSqlQuery(query);
  if (res[0]) return res[0];
  return false;
}

async function getUserByEmail(email) {
  const query = `SELECT * from users where email = "${email}";`;
  const res = await executeSqlQuery(query);
  if (res[0]) return JSON.parse(JSON.stringify(res[0]));
  return false;
}

async function createUser(params) {
  const salt = await bcrypt.genSalt(10);
  params.password = await bcrypt.hash(params.password, salt);
  const query = `insert into users (email,username,password,phone) 
  values ("${params.email}","${params.userName}","${params.password}","${params.phone}");`;
  const res = await executeSqlQuery(query);
  return res;
}

function validateCreateRequest({
  userName,
  email,
  password,
  phone,
  repeat_password,
}) {
  return schema.validate({
    userName,
    email,
    password,
    phone,
    repeat_password,
  });
}

async function updateUserOne(column,value,condition){
  const query = `UPDATE users
  SET ${column} = '${value}'
  WHERE email = '${condition}'; `;
  const res = await executeSqlQuery(query);
  return res;
}

module.exports = { 
  validateCreateRequest,
  getUserByEmail,
  getUserById,
  createUser,
  updateUserOne,
};