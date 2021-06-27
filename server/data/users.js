import encrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@ex.com",
    password: encrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Luka User",
    email: "luka@ex.com",
    password: encrypt.hashSync("123456", 10),
  },
  {
    name: "Ante User",
    email: "ante@ex.com",
    password: encrypt.hashSync("123456", 10),
  },
];
export default users;
