import query from '../config/db.js';

const BOOKS = [
    {
        "id": "1",
        "image": "george.jpg",
        "title": "Orientalism",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },

    {
        "id": "2",
        "image": "orientalism.jpg",
        "title": "Orientalism",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },
    {
        "id": "3",
        "image": "secret.jpg",
        "title": "Orientalism",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    }
]

const bestBooks = [
    {
        "id": "1",
        "image": "rich.jpg",
        "title": "rich",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },
    {
        "id": "2",
        "image": "habits.jpg",
        "title": "habits",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
        "email": "iplusone@gmail.com",
        "phone": "555-555-555",
        "city": "Antwerpen",
        "delivery": "pick",
        "information": "I am only on the weekends"
    },
    {
        "id": "3",
        "image": "mockingbird.jpg",
        "title": "mockingbird",
        "author": "George Orwell",
        "genre": "Fiction",
        "condition": "used",
        "price": "6$",
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
            const books = BOOKS;
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllBestSellerBooks: async (req, res) => {
        try {
            const bestSellerBooks = bestBooks;
            res.json(bestSellerBooks);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default bookControllers;
