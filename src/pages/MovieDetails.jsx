import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movie:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <img src={movie.posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Release Year:</strong> {movie.year}</p>
      {/* Add ratings, comments, or action buttons here */}
    </div>
  );
};

export default MovieDetails;
