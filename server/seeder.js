import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import partners from "./data/partners.js";
import products from "./data/products.js";
import articles from "./data/articles.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import Article from "./models/Article.js";
import Partner from "./models/Partner.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Article.deleteMany();
    await Partner.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers.find(({ isAdmin }) => isAdmin === true);

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Article.insertMany(articles);

    await Product.insertMany(sampleProducts);

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
    await Order.deleteMany();
    await Product.deleteMany();
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
