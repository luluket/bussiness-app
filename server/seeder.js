import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import partners from "./data/partners.js";
import articles from "./data/articles.js";
import User from "./models/User.js";
import Article from "./models/Article.js";
import Partner from "./models/Partner.js";
import Lager from "./models/Lager.js";
import CentralReceipt from "./models/CentralReceipt.js";
import CentralExport from "./models/CentralExport.js";
import MaterialLager from "./models/MaterialLager.js";
import MaterialImport from "./models/MaterialImport.js";
import Requisition from "./models/Requisition.js";
import RateOfYield from "./models/RateOfYield.js";
import Workorder from "./models/Workorder.js";
import MaterialConsumption from "./models/MaterialConsumption.js";
import ProductLager from "./models/ProductLager.js";
import ProductExport from "./models/ProductExport.js";
import CentralImport from "./models/CentralImport.js";
import SaleReceipt from "./models/SaleReceipt.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Article.deleteMany();
    await Partner.deleteMany();
    await Lager.deleteMany();
    await CentralReceipt.deleteMany();
    await CentralExport.deleteMany();
    await CentralImport.deleteMany();
    await MaterialLager.deleteMany();
    await MaterialImport.deleteMany();
    await Requisition.deleteMany();
    await RateOfYield.deleteMany();
    await Workorder.deleteMany();
    await MaterialConsumption.deleteMany();
    await ProductLager.deleteMany();
    await ProductExport.deleteMany();
    await SaleReceipt.deleteMany();

    await User.insertMany(users);
    await Article.insertMany(articles);
    await Partner.insertMany(partners);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit with failure
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit with failure
  }
};

if (process.argv[2] === "-d") {
  console.log("destroy");
  destroyData();
} else {
  console.log("import");
  importData();
}
