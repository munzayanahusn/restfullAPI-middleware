const express = require('express');
const router = express.Router();
const pool = require('../database/pool.js');
const { authenticate } = require('../middleware/authMiddleware');

// Get Movies with limitation
router.get('/', authenticate, (req, res) => {
    console.log('Middleware authenticate is called');
    pool.query(
        `SELECT * FROM movies ${
            req.query.limit ? 'LIMIT $1' : ''
        }`,
        [req.query.limit],
        (error, results) => {
            if (error) {
                console.error('Error fetching movies:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(results.rows);
        }
    );
});

// Get Movie by ID
router.get('/:id', authenticate, (req, res) => {
    pool.query(
        'SELECT * FROM movies WHERE id = $1',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error fetching movie by ID:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ error: 'Movie not found' });
                return;
            }
            res.json(results.rows[0]);
        }
    );
});

// Add Movie
router.post('/', authenticate, (req, res) => {
    const { title, genres, year } = req.body;
    if (!title || !genres || !year) {
        res.status(400).json({ error: 'Please provide title, genres, and year for the movie' });
        return;
    }
    pool.query(
        'INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3)',
        [title, genres, year],
        (error, results) => {
            if (error) {
                console.error('Error adding movie:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ status: 'Success! New movie added' });
        }
    );
});

// Delete Movie by ID
router.delete('/:id', authenticate, (req, res) => {
    pool.query(
        'DELETE FROM movies WHERE id = $1',
        [req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error deleting movie:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.rowCount === 0) {
                res.status(404).json({ error: 'Movie not found' });
                return;
            }
            res.status(200).json({ status: 'Success! Movie deleted' });
        }
    );
});

// Update Movie by ID
router.put('/:id', authenticate, (req, res) => {
    const { title, genres, year } = req.body;
    if (!title || !genres || !year) {
        res.status(400).json({ error: 'Please provide title, genres, and year for the movie' });
        return;
    }
    pool.query(
        'UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4',
        [title, genres, year, req.params.id],
        (error, results) => {
            if (error) {
                console.error('Error updating movie:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (results.rowCount === 0) {
                res.status(404).json({ error: 'Movie not found' });
                return;
            }
            res.status(200).json({ status: 'Success! Movie updated' });
        }
    );
});

module.exports = router;