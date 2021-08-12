import encrypt from "bcryptjs";
const partners = [
  {
    name: "Marko",
    surname: "Bosnić",
    oib: "46172152325",
    type: "dobavljač",
    email: "marko@fesb.hr",
    street: "Matice hrvatske",
    houseNumber: 11,
    city: "Split",
    zip: 21000,
    telephone: 220436,
    country: "Croatia",
    // password: encrypt.hashSync("123456", 10),
  },
  {
    name: "Mate",
    surname: "Skelin",
    oib: "34792832129",
    type: "kupac",
    email: "mate@fesb.hr",
    street: "Moliških Hrvata",
    houseNumber: 4,
    city: "Split",
    zip: 21000,
    telephone: 219485,
    country: "Croatia",
    // password: encrypt.hashSync("123456", 10),
  },
];
export default partners;
