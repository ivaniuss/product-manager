import { updateProduct, deleteProduct } from '../../controllers/productController';
import authenticateToken from '../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    await authenticateToken(req, res, async () => {
      await updateProduct(req, res);
    });
  } else if (req.method === 'DELETE') {
    await authenticateToken(req, res, async () => {
      await deleteProduct(req, res);
    });
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
