import Product from "../Models/Products.models.js";

// Save a new product
const saveProduct = async (req, res) => {
    const { name, brand, price, stock, rating } = req.body;
    try {
        if (!name || !brand || !price || !stock) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const product = new Product({ name, brand, price, stock, rating });
        await product.save();
        return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get all products with pagination
const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || 'relevance';
  
    try {
      const totalCount = await Product.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const skip = (page - 1) * limit;
  
      let sortOptions = {};
  
      switch (sortBy) {
        case 'relevance':
          break;
        case 'popularity':
          sortOptions = { rating: -1 }; 
          break;
        case 'lowToHigh':
          sortOptions = { price: 1 }; 
          break;
        case 'highToLow':
          sortOptions = { price: -1 }; 
          break;
      }
      const topThreeRatingProducts = await Product.find()
      .sort({ rating: -1 })
      .limit(3);

      const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);
  
      return res.status(200).json({ totalPages, topThreeRatingProducts, totalProducts: totalCount, products });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update product information by ID
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

export { saveProduct, getProducts, updateProduct, deleteProduct };
