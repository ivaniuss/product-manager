import { deleteAllProducts } from '../../controllers/productController';
import authenticateToken from '../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    await authenticateToken(req, res, async () => {
      await deleteAllProducts(req, res);
    });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
