const express = require('express');
const router = express.Router();
const pool = require('../database/pool');
const authenticate = require('../middleware/authMiddleware');

// Get Movies with limitation
router.get('/', authenticate, (req, res) => {
    pool.query(
        `SELECT * FROM movies ${
            req.query.limit ? 'LIMIT $1' : ''
        }`,
        req.query.limit ? [req.query.limit] : null,
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

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - movies
 *     summary: Get all movies
 *     description: Retrieves a list of movies. Optionally limit the number of movies returned.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Limit the number of movies returned
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved movies
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Movie'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - movies
 *     summary: Add a new movie
 *     description: Creates a new movie with the provided title, genres, and year.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: movie
 *         description: Movie object that needs to be added
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       201:
 *         description: Successfully added a new movie
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 *       400:
 *         description: Bad request, required fields are missing
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     tags:
 *       - movies
 *     summary: Get Movie by ID
 *     description: Retrieves a single movie by its ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the movie
 *         schema:
 *           $ref: '#/definitions/Movie'
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 * 
 *   put:
 *     tags:
 *       - movies
 *     summary: Update Movie by ID
 *     description: Updates a movie with the provided ID, title, genres, and year.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie to update
 *         required: true
 *         type: integer
 *       - in: body
 *         name: movie
 *         description: Updated movie object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       200:
 *         description: Successfully updated the movie
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 *       400:
 *         description: Bad request, required fields are missing
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     tags:
 *       - movies
 *     summary: Delete Movie by ID
 *     description: Deletes a movie by its ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the movie to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the movie
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;