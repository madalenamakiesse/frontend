import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

function Companhia() {
  const [loading, setLoading] = useState(true);
  const [companhias, setCompanhias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/companhias/')
            .then((response) => {
                setCompanhias(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (companhiaId) => {
      // Send a DELETE request to your API to delete the Avião
      axios.delete(`http://localhost:8000/api/companhias/${companhiaId}/`)
        .then(() => {
          // Update the state to reflect the deletion
          setCompanhias(companhias.filter((companhia) => companhia.id !== companhiaId));
        })
        .catch((error) => {
          console.error('Error deleting Companhia:', error);
        });
    };
  
    return (
        <div className="container-fluid">
          <h3 className="m-4">Companhias Aéreas</h3>
          <div className="row">
            <div className="col-12">
              <div class="lead m-4">
                <Link className="btn btn-primary btn-lg" to="/aN" >
                  Adicionar
                </Link>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : companhias.length > 0 ? (
                <div className="card bg-light ms-4 me-4 mb-4">
                  <div className="card-header">
                    <h5><FontAwesomeIcon icon={faTableList}/> Lista de Companhias Aéreas</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Código</th>
                              <th scope="col">Nome</th>
                              <th scope="col">Nacionalidade</th>
                              <th scope="col">Número de Aeronaves</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {companhias.map((item) => (
                              <tr key={item.id}>
                                <td>{item.codigo}</td>
                                <td>{item.nome}</td>
                                <td>{item.nacionalidade}</td>
                                <td>{item.numero_de_aeronaves}</td>
                                <td>
                                  <div class="lead">
                                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                        Eliminar
                                      </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </p>
                  </div>
                </div>
              ) : (
                <h5 className="alert alert-primary ms-4 me-4">Sem Registros de Companhias Aéreas</h5>
              )}
            </div>
          </div>
        </div>
      );
    }

export default Companhia;
