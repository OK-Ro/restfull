const express = require('express');
const router = express.Router();
const {getAllMovies,getMovieByTitle,getMovieById, createMovie,deleteMovie } = require('../controllers/movies.moviesController');

router.get('/', getAllMovies);
router.get('/:title', getMovieByTitle);
router.get('/:id',getMovieById);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;