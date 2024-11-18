import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetallesPeliculas = () => {
  const { id } = useParams();
  const [DetallesPeliculas, setDetallesPeliculas] = useState(null);
  const [personajes, setPersonajes] = useState([]);
  const [especies, setEspecies] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Detalles de la película:", data);
        setDetallesPeliculas(data);
        return data;
      })
      .then(data => {
        fetchPersonajes(data.people);
        fetchEspecies(data.species);
        fetchUbicaciones(data.locations);
        fetchVehiculos(data.vehicles);
      })
      .catch(error => console.error("Error al cargar los detalles:", error));
  }, [id]);

  const fetchPersonajes = (urls) => {
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data => setPersonajes(data))
      .catch(error => console.error("Error al cargar los personajes:", error));
  };

  const fetchEspecies = (urls) => {
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data => setEspecies(data))
      .catch(error => console.error("Error al cargar las especies:", error));
  };

  const fetchUbicaciones = (urls) => {
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data => setUbicaciones(data))
      .catch(error => console.error("Error al cargar las ubicaciones:", error));
  };

  const fetchVehiculos = (urls) => {
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data => setVehiculos(data))
      .catch(error => console.error("Error al cargar los vehículos:", error));
  };

  if (!DetallesPeliculas) return <p>Cargando detalles...</p>;

  return (
    <div className="bg-details d-flex flex-column align-items-center justify-content-center">
      <div className="container my-4">
        <h2>{DetallesPeliculas.title}</h2>
        <p>{DetallesPeliculas.description}</p>
        <h5>Director: {DetallesPeliculas.director}</h5>
        <h5>Productor: {DetallesPeliculas.producer}</h5>
        <p>Fecha de lanzamiento: {DetallesPeliculas.release_date}</p>
        <p>Calificación: {DetallesPeliculas.rt_score}</p>

        <hr />

        <h4>Personajes</h4>
        {personajes.length > 0 ? (
          <ul>
            {personajes.map(personaje => (
              <li key={personaje.id}>{personaje.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay personajes disponibles.</p>
        )}

        <h4>Especies</h4>
        {especies.length > 0 ? (
          <ul>
            {especies.map(especie => (
              <li key={especie.id}>{especie.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay especies disponibles.</p>
        )}

        <h4>Ubicaciones</h4>
        {ubicaciones.length > 0 ? (
          <ul>
            {ubicaciones.map(ubicacion => (
              <li key={ubicacion.id}>{ubicacion.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay ubicaciones disponibles.</p>
        )}

        <h4>Vehículos</h4>
        {vehiculos.length > 0 ? (
          <ul>
            {vehiculos.map(vehiculo => (
              <li key={vehiculo.id}>{vehiculo.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay vehículos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default DetallesPeliculas;
