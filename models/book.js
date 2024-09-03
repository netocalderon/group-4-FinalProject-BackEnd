import query from '../config/db.js';

const createBookTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    condition VARCHAR(50),
    price VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(100),
    delivery VARCHAR(50),
    information TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    `;

    try {
        await query(sql);
    } catch (error) {
        console.error('Error creating recipes table:', error);
    }
};

export default createBookTable;