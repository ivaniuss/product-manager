import { getProducts, createProduct } from '../../controllers/productController.js';
import authenticateToken from '../../middleware/auth.js';
import swaggerDocs from '../../swagger/swagger.js';
import express from 'express';

const app = express();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await authenticateToken(req, res, async () => {
      await getProducts(req, res);
    });
  } else if (req.method === 'POST') {
    await authenticateToken(req, res, async () => {
      await createProduct(req, res);
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

swaggerDocs(app);
