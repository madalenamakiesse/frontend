import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

function Aviao() {
  const [loading, setLoading] = useState(true);
  const [avioes, setAvioes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/avioes/')
            .then((response) => {
                setAvioes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (aviaoId) => {
      // Send a DELETE request to your API to delete the Avião
      axios.delete(`http://localhost:8000/api/avioes/${aviaoId}/`)
        .then(() => {
          // Update the state to reflect the deletion
          setAvioes(avioes.filter((aviao) => aviao.id !== aviaoId));
        })
        .catch((error) => {
          console.error('Error deleting Avião:', error);
        });
    };
  
    return (
        <div className="container-fluid">
          <h3 className="m-4">Aviões</h3>
          <div className="row">
            <div className="col-12">
              <div class="lead m-4">
                <Link className="btn btn-primary btn-lg" to="/aN" >
                  Adicionar
                </Link>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : avioes.length > 0 ? (
                <div className="card bg-light ms-4 me-4 mb-4">
                  <div className="card-header">
                    <h5><FontAwesomeIcon icon={faTableList}/> Lista de Aviões</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Registro</th>
                              <th scope="col">Marca</th>
                              <th scope="col">Modelo</th>
                              <th scope="col">Número de Passageiros</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {avioes.map((item) => (
                              <tr key={item.id}>
                                <td>{item.registro}</td>
                                <td>{item.marca}</td>
                                <td>{item.modelo}</td>
                                <td>{item.numero_de_passageiros}</td>
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
                <h5 className="alert alert-primary ms-4 me-4">Sem Registros de Aviões</h5>
              )}
            </div>
          </div>
        </div>
      );
    }

export default Aviao;
