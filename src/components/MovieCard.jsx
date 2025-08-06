import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="card mb-4 border-0 shadow movie-card">
      <div className="row g-0">
        {/* Poster Section */}
        <div className="col-md-4 d-flex align-items-center justify-content-center bg-light">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="img-fluid rounded-start"
            style={{ maxHeight: '220px', objectFit: 'cover' }}
          />
        </div>

        {/* Info Section */}
        <div className="col-md-8">
          <div className="card-body d-flex flex-column justify-content-between h-100">
            <div>
              <h4 className="card-title">{movie.title}</h4>
              <span className="badge bg-dark mb-2">{movie.genre}</span>
              {movie.year && (
                <p className="card-text text-muted">
                  <small>Released: {movie.year}</small>
                </p>
              )}
              {movie.description && (
                <p className="card-text">{movie.description.slice(0, 100)}...</p>
              )}
            </div>
            <div className="mt-3">
              <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
