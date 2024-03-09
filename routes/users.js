const express = require('express');
const router = express.Router();
const pool = require('../database/pool');
const { createToken } = require('../auth.js');

/**
 * @swagger
 * /users/register:
 *  post:
 *      tags:
 *          - users
 *      summary: Register a new user
 *      description: Creates a new user with the provided email, password, role, and gender.
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *              name: user
 *              description: User object that needs to be registered
 *              required: true
 *              schema:
 *                  type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                  gender:
 *                      type: string
 *      responses:
 *          201:
 *              description: Successfully registered a new user
 *              schema:
 *                  type: object
 *              properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *          400:
 *              description: Bad request, required fields are missing
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags:
 *          - users
 *      summary: Login as a user
 *      description: Logs in a user with the provided email and password.
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *              name: user
 *              description: User object that needs to be logged in
 *              required: true
 *              schema:
 *                  type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          200:
 *              description: Successfully logged in
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      role:
 *                          type: string
 *                      token:
 *                          type: string
 *          400:
 *              description: Bad request, required fields are missing
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 */

// Register users
router.post('/register', (req, res) => {
    const { email, password, role, gender } = req.body;
    if (!email || !password || !role || !gender) {
        return res.status(400).json({ error: 'Email, password, role, and gender are required' });
    }

    // Ensure that gender is either Female or Male
    if (!['Female', 'Male'].includes(gender)) {
        return res.status(400).json({ error: 'Gender must be Female or Male' });
    }

    pool.query(
        'INSERT INTO users (email, password, role, gender) VALUES ($1, $2, $3, $4)',
        [email, password, role, gender],
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