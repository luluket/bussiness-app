import encrypt from "bcryptjs";
const partners = [
  {
    name: "Marko",
    surname: "Bosnić",
    oib: "46172152325",
    type: "dobavljač",
    email: "marko@fesb.hr",
    // password: encrypt.hashSync("123456", 10),
  },
  {
    name: "Mate",
    surname: "Skelin",
    oib: "34792832129",
    type: "kupac",
    email: "mate@fesb.hr",
    // password: encrypt.hashSync("123456", 10),
  },
];
export default partners;
