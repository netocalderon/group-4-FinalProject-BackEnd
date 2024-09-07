import query from '../config/db.js';

const bestBooks = [
    {
        "id": "1",
        "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645034/book-images/lpbz2nqqcag1qjza4iqx.jpg",
        "title": "rich",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },
    {
        "id": "2",
        "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645033/book-images/cbl912iep0a2epz3m21p.jpg",
        "title": "habits",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },
    {
        "id": "3",
        "image": "https://res.cloudinary.com/dpe8wsyk8/image/upload/v1725645033/book-images/qrzjdkpgcqobvhjnt7lf.webp",
        "title": "mockingbird",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    }
]

const bookControllers = {
    getAllBooks: async (req, res) => {
        try {
            const sql = `
            SELECT books.*, users.username AS seller_name
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
            SELECT books.*, users.username AS seller_name
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
    getAllBestSellerBooks: async (req, res) => {
        try {
            const bestSellerBooks = bestBooks;
            res.json(bestSellerBooks);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    addBook: async (req, res) => {
        console.log('User ID:', req.user?.id);
        console.log('Body:', req.body)
        
        try {
            const {image, title, author, genre, book_condition, price, email, phone, city, delivery, information} = req.body;
            if (!req.user || !req.user.id) {
                return res.status(400).json({ message: 'User ID is missing' });
            }
            
            if (!image || !title || !author || !genre || !book_condition || !price || !email || !phone || !city || !delivery) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            const sql = `INSERT INTO books(image, title, author, genre, book_condition, price, email, phone, city, delivery, information, seller_id)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            await query(sql, [
                image,
                title,
                author,
                genre,
                book_condition,
                price,
                email,
                phone,
                city,
                delivery,
                information,
                req.user.id
            ]);
            res.status(201).json({ message: 'Book added successfully' });
        } catch (error) {
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