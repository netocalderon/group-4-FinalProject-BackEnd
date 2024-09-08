import express from 'express';
import verifyToken from '../middleware/verifyToken.js'; // import verifyToken from '../middleware/verifyToken.js';
import bookControllers from '../controllers/book.js';

const router = express.Router();

router.get('/all', bookControllers.getAllBooks);
router.get('/recent', bookControllers.getRecentBooks);
router.get('/best', bookControllers.getBestSellerBooks);

router.post('/add', verifyToken, bookControllers.addBook);
// router.post('/edit', verifyToken, bookControllers.editBook);
// router.post('/delete', verifyToken, bookControllers.deleteBook);

export default router;
