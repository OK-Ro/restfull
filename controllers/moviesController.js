const movies = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      releaseDate: "2010-07-16",
      genre: "Science Fiction",
      country: "USA"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      releaseDate: "1994-09-23",
      genre: "Drama",
      country: "USA"
    },
    {
      id: 3,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      releaseDate: "1972-03-24",
      genre: "Crime",
      country: "USA"
    },
    {
      id: 4,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      releaseDate: "2008-07-18",
      genre: "Action",
      country: "USA"
    },
    
  ];

const getAllMovies =(req, res) => {
    res.status(200).json(movies);
};

const getMovieByTitle = (req, res) => {
    const title = req.params.title;

    if (title) {
        const movieByName = movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());
        if (movieByName) {
            res.status(200).json(movieByName);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } else {
        res.status(400).json({ message: 'Title parameter is required' });
    }
};

const getMovieById = (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieById = movies.find(movie => movie.id === movieId);

    if (movieById) {
        res.status(200).json(movieById);
    } else {
        res.status(404).json({
            message: 'Movie not found'
        });
    }
};

const createMovie = (req, res) => {
    const { title, director, releaseDate, genre, country } = req.body;

    if (!title || !director || !releaseDate) {
        res.status(400).json({
            message: 'Title, director, and release date are required fields'
        });
        return;
    }

    const id = movies.length + 1;
    const newMovie = { id, title, director, releaseDate, genre, country };
    movies.push(newMovie);

    res.status(201).json({
        message: 'Movie was created successfully',
        id: newMovie.id
    });
};

const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (!movies[id]) {
        res.status(404).json({ message: `Movie with id ${id} not found` });
    } else {
        movies.splice(id, 1);
        res.status(200).json({ message: 'Movie deleted successfully' });
    }
};

module.exports = {
    getAllMovies,
    getMovieByTitle,
    getMovieById,
    createMovie,
    deleteMovie
};