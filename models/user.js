import query from '../config/db.js';
import hashPassword from '../utils/hashPassword.js';

const createUserTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phonenumber VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
`;

    try {
        await query(sql)

        // create test user
        const checkUserSql = `SELECT * FROM users WHERE email = ?`;
        const testUserEmail = "testuser@example.com";
        const users = await query(checkUserSql, [testUserEmail]);

        if (users.length === 0) {
            const username = "TestUser";
            const password = await hashPassword("password123");
            const phonenumber = "1234567890";

            const insertUserSql = `
                INSERT INTO users (username, email, password, phonenumber) 
                VALUES (?, ?, ?, ?)
            `;
            await query(insertUserSql, [username, testUserEmail, password, phonenumber]);

            console.error('Error creating books table:');
        } else {
            console.log("Test user already exists");
        }
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

export default createUserTable;