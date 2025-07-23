import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({ user: req.user }); // 🧠 only fetch user's products
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// controllers/productsController.js
export const createProduct = async (req, res) => {
  try {
	console.log("Creating product for user:", req.user._id);
    const product = await Product.create({
      ...req.body,
      user: req.user._id, // 👈 attach the current user ID
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const productUpdates = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		// ✅ Fix the authorization check
		if (product.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Unauthorized" });
		}

		const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("❌ updateProduct error:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 🚫 Authorization check
  if (product.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized to delete this product" });
  }

  // ✅ Correct Mongoose 7+ way
  await product.deleteOne();

  res.status(200).json({ success: true, message: "Product deleted" });
};

