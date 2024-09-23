import query from '../config/db.js';

const bookControllers = {
    getAllBooks: async (req, res) => {
        try {
            const sql = `
            SELECT books.*, users.username AS seller_name, users.email AS seller_email, users.phonenumber AS seller_phonenumber
            FROM books 
            JOIN users  ON books.seller_id = users.id;
        `;
            const books = await query(sql);
            res.status(200).json(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ error: 'Error fetching books' });
        }
    },
    getRecentBooks: async (req, res) => {
        try {
            const sql = `
            SELECT books.*, users.username AS seller_name, users.email AS seller_email, users.phonenumber AS seller_phonenumber
            FROM books 
            JOIN users  ON books.seller_id = users.id
            ORDER BY books.created_at DESC
            LIMIT 3; 
        `;
            const books = await query(sql);
            res.status(200).json(books);
        } catch (error) {
            console.error('Error fetching recent books:', error);
            res.status(500).json({ error: 'Error fetching recent books' });
        }
    },
    getBestSellerBooks: async (req, res) => {
        try {
            const sql = `
            SELECT books.*, users.username AS seller_name, users.email AS seller_email, users.phonenumber AS seller_phonenumber
            FROM books
            JOIN users ON books.seller_id = users.id
            WHERE books.is_bestseller = 1
            ORDER BY books.created_at DESC
            LIMIT 3;
        `;
            const books = await query(sql);

            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching bestseller books' });
        }
    },
    getBookById: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `
            SELECT books.*, users.username AS seller_name, users.email AS seller_email, users.phonenumber AS seller_phonenumber
            FROM books
            JOIN users ON books.seller_id = users.id
            WHERE books.id = ?;
        `;
            const book = await query(sql, [id]);
            res.status(200).json(book);
        } catch (error) {
            res.status(404).json({ message: 'Error fetching book' });
        }
    },

    getBookByQuery: async (req, res) => {
        try {
            const searchTerm = `%${req.params.q}%`;
            console.log('Searching for:', searchTerm);
            const sql = `
            SELECT books.*, users.username AS seller_name, users.email AS seller_email, users.phonenumber AS seller_phonenumber
            FROM books
            JOIN users ON books.seller_id = users.id
            WHERE books.title LIKE ? OR books.author LIKE ?
        `;
            const books = await query(sql, [searchTerm, searchTerm]);

            if (books.length > 0) {
                return res.status(200).json(books);
            } else {
                return res.status(200).json({ message: 'No books found' });
            }
        } catch (error) {
            console.error('Error fetching books by query:', error);
            return res.status(500).json({ message: 'Error fetching books' });
        }
    },
    addBook: async (req, res) => {
        console.log('User:', req.user);
        console.log('Body:', req.body);

        try {
            const { image, title, author, genre, book_condition, price, city, delivery, information } = req.body;

            if (!req.user || !req.user.id) {
                return res.status(400).json({ message: 'User ID is missing' });
            }

            if (!image || !title || !author || !genre || !book_condition || !price || !city || !delivery) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: 'Invalid price value' });
            }

            const sql = `
            INSERT INTO books (
                image, title, author, genre, book_condition, price, city, delivery, information, seller_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

            await query(sql, [
                image,
                title,
                author,
                genre,
                book_condition,
                price,
                city,
                delivery,
                information,
                req.user.id
            ]);


            res.status(201).json({ message: 'Book added successfully' });
        } catch (error) {
            console.error('Error adding book:', error.message);  // Log error message for debugging
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    editBook: async (req, res) => {

        console.log(req.body)
        try {
            const { id } = req.params;
            const { image, title, author, genre, book_condition, price, city, delivery, information, status } = req.body;

            if (!image || !title || !author || !genre || !book_condition || !price || !city || !delivery || status === undefined) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: 'Invalid price value' });
            }

            const sql = `
        UPDATE books
        SET image = ?, title = ?, author = ?, genre = ?, book_condition = ?, price = ?, city = ?, delivery = ?, information = ?, status = ?
        WHERE id = ?
        `;

            await query(sql, [
                image,
                title,
                author,
                genre,
                book_condition,
                price,
                city,
                delivery,
                information,
                status,
                id
            ]);

            res.status(200).json({ message: 'Book updated successfully' });
        } catch (error) {
            console.error('Error updating book:', error.message);
            res.status(500).json({ message: 'Error updating book' });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;

            const sql = `
            DELETE FROM books
            WHERE id = ?
        `;
            await query(sql, [id]);

            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book' });
        }
    }
}
export default bookControllers;
