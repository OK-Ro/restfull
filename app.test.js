const request = require('supertest');
const app = require('./app'); 

describe('Movie API Tests', () => {
    it('GET /movies should respond with status 200 and an array of movies', () => {
        return request(app)
            .get('/movies')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true);
            });    
    });

    
    it('GET /movies/:title should respond with status 404 when movie is not found', () => {
        return request(app)
            .get('/movies/invalid_title')  // Replace with an invalid title
            .expect(404)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body.message).toBe('Movie not found');
            });
    });

    it('GET /movies/:title should respond with status 200 and the movie details if movie exists by title', () => {
        const titleToSearch = 'Inception'; // Use an existing movie title from your movies array
    
        return request(app)
            .get(`/movies/${titleToSearch}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body.title).toBe(titleToSearch);
            });
    });
    
    
      it('GET /movies/:title should respond with status 404 and an error message if movie is not found by title', () => {
        const nonexistentTitle = 'Nonexistent Movie'; // Replace with a non-existing movie title
    
        return request(app)
          .get(`/movies/${nonexistentTitle}`)
          .expect(404)
          .expect('Content-Type', /json/)
          .expect(response => {
            expect(response.body.message).toBe('Movie not found');
          });
      });

    it('POST /movies should create a new movie and respond with status 201 and the created movie ID', () => {
        const newMovie = {
            title: 'New Movie',
            director: 'Director Name',
            releaseDate: '2023-08-01',
            genre: 'Action',
            country: 'USA'
        };
    
        return request(app)
            .post('/movies')
            .send(newMovie) // Send the request body here
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body.message).toBe('Movie was created successfully');
                expect(response.body.id).toBeDefined();
            });
    });
    
    
      it('POST /movies should respond with status 400 and an error message if required fields are missing', () => {
        const invalidMovie = {
            title: 'Invalid Movie'
            // Missing director and releaseDate
        };
    
        return request(app)
            .post('/movies')
            .send(invalidMovie)
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body.message).toBe('Title, director, and release date are required fields');
            });
    });
    
    

    it('should delete a movie by ID and respond with status 200', () => {
        const idToDelete = 1; // Adjust the ID to the one you want to delete

        return request(app)
            .delete(`/movies/${idToDelete}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body.message).toBe('Movie deleted successfully');
            });
    });

    it('should respond with status 404 and an error message if the movie ID is not found', () => {
        const nonExistId = 999; // An ID that does not exist

        return request(app)
            .delete(`/movies/${nonExistId}`)
            .expect(404)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body.message).toBe(`Movie with id ${nonExistId} not found`);
            });
    });
});