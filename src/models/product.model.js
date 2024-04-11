import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      default: "",
      require: true,
      index: true,
      unique: true,
    },
    ProductCategory: {
      type: String,
      default: "",
    },
    Price: {
      type: String,
      default: "",
    },
    Description: {
      type: String,
      default: "",
    },
    Features: {
      type: String,
      default: "",
    },
  },);

const Product = mongoose.model("Product", productSchema);

export default Product;
