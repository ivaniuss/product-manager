import Product from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id } });
      res.status(200).json(updatedProduct);
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await Product.destroy({ where: {}, truncate: true });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loadTestProducts = async (req, res) => {
  try {
    const products = [];
    for (let i = 1; i <= 50; i++) {
      products.push({
        name: `Test Product ${i}`,
        price: (Math.random() * 100).toFixed(2),
        description: `This is a description for test product ${i}`,
      });
    }
    await Product.bulkCreate(products);
    res.status(201).json({ message: '50 test products loaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
