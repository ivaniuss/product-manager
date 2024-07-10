import { loadTestProducts } from '../../controllers/productController';
import authenticateToken from '../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await authenticateToken(req, res, async () => {
      await loadTestProducts(req, res);
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
