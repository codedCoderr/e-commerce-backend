const env = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminAuthRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');

env.config();

const db = process.env.DB_URL;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true })
  .then(() => {
    console.log("DB connected");
  });
app.use(express.json({ extended: false }));
// app.use(cors);

app.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Hello from the server",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


app.use("/api", authRoutes);
app.use('/api',adminAuthRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
