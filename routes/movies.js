const express = require('express');
const router = express.Router();

var pool = require('../database/query.js');

// To DO : Add middleware to the authourization

// Get Users with limitation
router.get('/', function (req, res) {
    pool.query(
        `SELECT * FROM movies ${
        req.query.limit ? 'LIMIT ' + req.query.limit : ''
        } `,
        (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results.rows);
        }
    );
});

// Get Users by ID
router.get('/:id', function (req, res) {
    pool.query(
        `SELECT * FROM movies WHERE id = ${req.params.id}`,
        (error, results) => {
        if (error) {
            throw error;
        }
        res.json(results.rows);
        }
    );
});

// Add Users
router.post('/', function (req, res) {
    pool.query(
        `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
        [req.body.title, req.body.genres, req.body.year],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).json({
            status: 'Success! New movie added',
        });
        }
    );
});

// Delete Users by ID
router.delete('/:id', function (req, res) {
    pool.query(
        `DELETE FROM movies WHERE id = ${req.params.id}`,
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).json({
            status: 'Success! Movie deleted',
        });
        }
    );
});

// Update Users by ID
router.put('/:id', function (req, res) {
    pool.query(
        `UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = ${req.params.id}`,
        [req.body.title, req.body.genres, req.body.year],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).json({
            status: 'Success! Movie updated',
        });
        }
    );
});

module.exports = router;