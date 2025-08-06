import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/admin/movies')
      .then((res) => setMovies(res.data))
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/movies/${id}`);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎬 Admin Dashboard</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/admin/movies/add')}
        >
          + Add New Movie
        </button>
      </div>

      {movies.length > 0 ? (
        <div className="list-group">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{movie.title}</h5>
                <small className="text-muted">{movie.genre}</small>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No movies found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
