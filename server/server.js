import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import lagerRoutes from "./routes/lagerRoutes.js";
import centralReceiptRoutes from "./routes/centralReceiptRoutes.js";
import centralExportRoutes from "./routes/centralExportRoutes.js";
import materialLagerRoutes from "./routes/materialLagerRoutes.js";
import materialImportRoutes from "./routes/materialImportRoutes.js";
import rateOfYieldRoutes from "./routes/rateOfYieldRoutes.js";
import requisitionRoutes from "./routes/requisitionRoutes.js";
import workorderRoutes from "./routes/workorderRoutes.js";
import productLagerRoutes from "./routes/productLagerRoutes.js";
import materialConsumptionRoutes from "./routes/materialConsumptionRoutes.js";
import productExportRoutes from "./routes/productExportRoutes.js";
import centralImportRoutes from "./routes/centralImportRoutes.js";
import saleReceiptRoutes from "./routes/saleReceiptRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/lager", lagerRoutes);
app.use("/api/central/receipts", centralReceiptRoutes);
app.use("/api/central/exports", centralExportRoutes);
app.use("/api/central/imports", centralImportRoutes);
app.use("/api/material/lager", materialLagerRoutes);
app.use("/api/material/imports", materialImportRoutes);
app.use("/api/rates", rateOfYieldRoutes);
app.use("/api/requisitions", requisitionRoutes);
app.use("/api/workorders", workorderRoutes);
app.use("/api/product/lager", productLagerRoutes);
app.use("/api/material/consumptions", materialConsumptionRoutes);
app.use("/api/product/exports", productExportRoutes);
app.use("/api/sale/receipts", saleReceiptRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "/client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
