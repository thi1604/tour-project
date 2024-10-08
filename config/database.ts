import {Sequelize} from "sequelize";
// import dotenv from 'dotenv';
// dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_USER_PASS, {
  host: 'localhost', 
  dialect: 'mysql'
});

console.log(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PASS)

sequelize.authenticate().then(() => {
  console.log('Kết nối DB thành công.');
}).catch((error) => {
  console.error('Kết nối DB thất bại: ', error);
}); 

export default sequelize;