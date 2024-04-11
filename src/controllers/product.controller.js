import Product from "../models/product.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addProduct = async (req, res) => {
  try {
    let ProductName = req.body.ProductName;
    let ProductCategory = req.body.ProductCategory;
    let Price = req.body.Price;
    let Description = req.body.Description;
    let Features = req.body.Features;
    const prod = await Product.findOne({
      ProductName: req.body.ProductName,
    });
    if(prod){
      return res.status(400).json({ error: "Product already exists" });
    }
    const newProduct = new Product({
      ProductName,
      ProductCategory,
      Price,
      Description,
      Features,
    });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log("Error in adding a product ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const prod = await Product.findOne({
      _id: id,
    });

    if (!prod) return res.status(200).json([]);

    res.status(200).json(prod);
  } catch (error) {
    console.log("Error in getProductById controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const prod = await Product.find({});

    if (!prod) return res.status(200).json([]);

    res.status(200).json(prod);
  } catch (error) {
    console.log("Error in getAllProducts controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const editProduct = async (req, res) => {

  try {
    const prod = await Product.updateOne(
      { _id: req.body.id },
      {
        $set: {
          ProductName: req.body.ProductName,
          price: req.body.price,
          description: req.body.description,
        },
      }
    );

    if (!prod) return res.status(200).json([]);

    res.status(200).json(prod);
  } catch (error) {
    console.log("Error in editProduct controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const prod = await Product.deleteOne({ _id: id });

    if (!prod) return res.status(200).json([]);

    res.status(200).json(prod);
  } catch (error) {
    console.log("Error in deleteProduct controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
