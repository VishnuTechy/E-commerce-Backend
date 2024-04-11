import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		ProductId: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
			unique: true,
		}],
		Count: [{
			ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
			Count: { type: Number, default: 0 }
		}],
	},
	{ timestamps: true }
);

const cart = mongoose.model("cart", cartSchema);

export default cart;
