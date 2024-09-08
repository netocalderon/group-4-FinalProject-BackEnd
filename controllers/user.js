import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';

const userControllers = {

    register: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Password must be between 6 to 16 characters long and contain at least one uppercase letter, one special character, and one number' });
        }

        const sql = 'SELECT * FROM users WHERE email = ?';
        const user = await query(sql, [email]);
        if (user.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const result = await query(insertSql, [name, email, hashedPassword]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Cannot add  the user' });
        } else {
            res.status(201).json({ message: 'User added successfully' });
        }

    },

    login: async (req, res) => {
        // console.log(process.env.TOKEN_ACCESS_SECRET)
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ error: 'Invalid email' });
            }
            const sql = 'SELECT * FROM users WHERE email = ?';
            const user = await query(sql, [email]);
            if (user.length === 0) {
                return res.status(400).json({ error: 'No user with this email found' });
            }
            const isMatchedPassword = await matchPasswords(password, user[0].password);
            if (!isMatchedPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            }
            const token = jwt.sign({ id: user[0].id }, process.env.TOKEN_ACCESS_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({ message: 'Login successful', token, user: user[0] });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    logout: async (req, res) => {
        try {
            return res.clearCookie('token').json({ message: 'Logout successful' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Error logging out' });
        }

    },

};

export default userControllers;