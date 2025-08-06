import { useEffect, useState } from 'react';
import API from '../api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/movies/getMovies') // <--- corrected path
      .then((res) => {
        console.log('API Response:', res.data);
        // your controller sends { movies: [...] }
        const movieList = Array.isArray(res.data)
          ? res.data
          : res.data.movies;
        setMovies(movieList || []);
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', {
          message: err.message,
          response: err.response ? {
            status: err.response.status,
            data: err.response.data,
          } : null,
          config: err.config,
        });
        setError(
          err.response
            ? `Failed to load movies: ${err.response.status}`
            : 'Network error: could not reach backend'
        );
      });
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>All Movies</h2>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={movie._id || movie.id || index}
              movie={movie}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
