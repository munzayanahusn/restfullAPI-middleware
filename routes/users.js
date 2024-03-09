const express = require('express');
const router = express.Router();
const pool = require('../database/pool');
const { createToken } = require('../auth.js');

// Register users
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
    }

    pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, password],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ status: 'Success! New user added' });
        }
    );
});

// Login users
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            const user = results.rows[0];
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const token = createToken(user);
            res.json({ 
                email: user.email,
                role: user.role,
                token: token
            });
        }
    );
});

module.exports = router;