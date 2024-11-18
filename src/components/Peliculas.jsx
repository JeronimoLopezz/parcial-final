import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Peliculas = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => setFilms(data))
      .catch(error => console.error("Error al cargar los datos:", error));
  }, []);

  return (
    <div className="bg-main d-flex flex-column align-items-center justify-content-center">
      <h1 className="my-4">Películas de Studio Ghibli</h1>
      <div className="container">
        <div className="row">
          {films.map(film => (
            <div key={film.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{film.title}</h5>
                  <p className="card-text">{film.description.substring(0, 100)}...</p>
                  <Link to={`/film/${film.id}`} className="btn btn-primary">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Peliculas;
