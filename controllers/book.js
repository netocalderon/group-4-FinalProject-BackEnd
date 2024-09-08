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

            // Send success response
            res.status(201).json({ message: 'Book added successfully' });
        } catch (error) {
            console.error('Error adding book:', error.message);  // Log error message for debugging
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}

export default bookControllers;


// getAllBooks: async (req, res) => {
//     try {
//         const books = BOOKS;
//         res.json(books);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// },


// const BOOKS = [
//     {
//         "id": "1",
//         "image": "george.jpg",
//         "title": "Orientalism",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6$",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     },

//     {
//         "id": "2",
//         "image": "orientalism.jpg",
//         "title": "Orientalism",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6$",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     },
//     {
//         "id": "3",
//         "image": "secret.jpg",
//         "title": "Orientalism",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6$",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     }
// ]

// const bestBooks = [
//     {
//         "id": "1",
//         "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645034/book-images/lpbz2nqqcag1qjza4iqx.jpg",
//         "title": "rich",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     },
//     {
//         "id": "2",
//         "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645033/book-images/cbl912iep0a2epz3m21p.jpg",
//         "title": "habits",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     },
//     {
//         "id": "3",
//         "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645033/book-images/qrzjdkpgcqobvhjnt7lf.webp",
//         "title": "mockingbird",
//         "author": "George Orwell",
//         "genre": "Fiction",
//         "condition": "used",
//         "price": "6",
//         "email": "iplusone@gmail.com",
//         "phone": "555-555-555",
//         "city": "Antwerpen",
//         "delivery": "pick",
//         "information": "I am only on the weekends"
//     }
// ]