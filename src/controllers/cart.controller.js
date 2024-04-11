import cart from "../models/cart.model.js";

export const addProductToCart = async (req, res) => {
  try {
    let productId = req.body.productId;
    let cartObj = await cart.findOne({ userId: req.body.userId });

    if (!cartObj) {
      cartObj = await cart.create({ userId: req.body.userId });
    }
    cartObj.ProductId.push(productId);
	cartObj.Count.push({"ProductId":productId,"Count":req.body.Count});
	await cartObj.save();
    res.status(200).json(cartObj);
  } catch (error) {
    console.log("Error in adding a product ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductFromCart = async (req, res) => {
	try {
	  let cartObj = await cart.findOne({ userId: req.params.userId });
  
	  res.status(200).json(cartObj);
	} catch (error) {
	  console.log("Error in getProductFromCart ", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  };

  export const updateQuantity = async (req, res) => {
	try {
	  let cartObj = await cart.findOne({ userId: req.body.userId });
	  const updatedCount = cartObj.Count.map(item => {
		if (item.ProductId ==req.body.productId) {
		  return { ...item, Count: req.body.Count };
		}
		return item;
	  });

	  cartObj.Count = updatedCount;
	  await cartObj.save();
	  res.status(200).json(cartObj);
	} catch (error) {
	  console.log("Error in updateQuantity ", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  };


  export const removeProduct = async (req, res) => {
	try {
	  let cartObj = await cart.findOne({ userId: req.body.userId });
	  cartObj.Count = cartObj.Count.filter(item => item.ProductId != req.body.productId);
	  cartObj.ProductId = cartObj.ProductId.filter(item => item != req.body.productId);
	  await cartObj.save();
	  res.status(200).json(cartObj);
	} catch (error) {
	  console.log("Error in removeProduct ", error);
	  res.status(500).json({ error: "Internal server error" });
	}
  };
