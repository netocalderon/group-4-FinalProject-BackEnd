import query from '../config/db.js';

const createBookTable = async () => {
    const sql = `
   CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    book_condition VARCHAR(50),
    price VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(100),
    delivery VARCHAR(50),
    information TEXT,
    seller_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) -- Foreign key relationship with users table
    );
    `;

    try {
        await query(sql);
        console.log('Books table created successfully');

        // create test data
        const checkTestBookSql = `SELECT * FROM books where seller_id = 1`;
        const books = await query(checkTestBookSql);

        if (books.length === 0) {
            const books = [

                ['https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645034/book-images/sqzvetc8slgwgadblyzz.jpg', '1984', 'George Orwell', 'Fiction', 'used', '6', 'iplusone@gmail.com', '555-555-555', 'Antwerpen', 'pickup', 'I am available only on weekends', 1],
                ['https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645034/book-images/maww9mfmonxuf6ch9e6x.jpg', 'Orientalism', 'Edward Said', 'Non-fiction', 'used', '6', 'iplusone@gmail.com', '555-555-555', 'Antwerpen', 'pickup', 'I am available only on weekends', 1],
                ['https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645033/book-images/mablp6scxaa1qrjio9yf.webp', 'The Secret', 'Rhonda Byrne', 'Self-help', 'used', '6', 'iplusone@gmail.com', '555-555-555', 'Antwerpen', 'pickup', 'I am available only on weekends', 1]
            ];
            const insertBookSql = `
        INSERT INTO books (image, title, author, genre, book_condition, price, email, phone, city, delivery, information, seller_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

            for (const book of books) {
                await query(insertBookSql, book);
            }
            console.log('Test data created successfully');
        } else {
            console.log('Books already exist in the database. No need to insert test data.');
        }

    } catch (error) {
        console.error('Error creating books table:', error);
    }
};

export default createBookTable;