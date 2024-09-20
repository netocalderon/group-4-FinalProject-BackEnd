import express from 'express';
import verifyToken from '../middleware/verifyToken.js'; // import verifyToken from '../middleware/verifyToken.js';
import bookControllers from '../controllers/book.js';

const router = express.Router();

router.get('/all', bookControllers.getAllBooks);
router.get('/recent', bookControllers.getRecentBooks);
router.get('/best', bookControllers.getBestSellerBooks);
router.get('/:id', bookControllers.getBookById);
router.get('/search/:q', bookControllers.getBookByQuery);
router.post('/add', verifyToken, bookControllers.addBook);
router.put('/:id', verifyToken, bookControllers.editBook);
router.delete('/:id', verifyToken, bookControllers.deleteBook);

export default router;