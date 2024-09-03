import express from 'express';
import bookControllers from '../controllers/book.js';

const router = express.Router();

router.get('/books', bookControllers.getAllBooks);

router.get('/best', bookControllers.getAllBestSellerBooks);

export default router;
