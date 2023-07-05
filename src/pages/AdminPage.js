import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Table.css';

const AdminPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Import data movies dari movies.json
    import('../data/movies.json').then((data) => {
      setMovies(data.default);
    });
  }, []);

  const handleDelete = (slug) => {
    // Menghapus film berdasarkan slug
    const updatedMovies = movies.filter((movie) => movie.slug !== slug);
    setMovies(updatedMovies);
  };

  return (
    <div>
      <Link to="/admin/add" className='btn btn-outline-primary m-3'>Tambah Film</Link>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.slug}>
              <td>{movie.title}</td>
              <td>
                <Link to={`/admin/edit/${movie.slug}`} className='action btn btn-outline-warning'>Edit</Link>
                <button onClick={() => handleDelete(movie.slug)} className='action btn btn-outline-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
