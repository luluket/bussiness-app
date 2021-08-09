import encrypt from "bcryptjs";
const users = [
  {
    name: "Luka",
    surname: "Luketin",
    oib: "64540953208",
    type: "zaposlenik",
    email: "luka@fesb.hr",
    password: encrypt.hashSync("123456", 10),
    role: "tehnolog",
  },
  {
    name: "Ante",
    surname: "Lovrić",
    oib: "87452843291",
    type: "zaposlenik",
    email: "ante@fesb.hr",
    password: encrypt.hashSync("123456", 10),
    role: "radnik",
  },
  {
    name: "Ivan",
    surname: "Mijatović",
    oib: "86412842221",
    type: "zaposlenik",
    email: "ivan@fesb.hr",
    password: encrypt.hashSync("123456", 10),
    role: "skladištar",
  },
  {
    name: "Nikola",
    surname: "Žunić",
    oib: "36122852321",
    type: "zaposlenik",
    email: "nikola@fesb.hr",
    password: encrypt.hashSync("123456", 10),
    role: "radnik",
  },
  {
    name: "Josip",
    surname: "Ivančić",
    oib: "98322162321",
    type: "zaposlenik",
    email: "josip@fesb.hr",
    password: encrypt.hashSync("123456", 10),
    role: "admin",
  },
];
export default users;
