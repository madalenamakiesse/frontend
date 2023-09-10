import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';

function Nacional() {
  const [loading, setLoading] = useState(true);
  const [nacionais, setNacionais] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/nacionais/')
            .then((response) => {
                setNacionais(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (nacionalId) => {
      // Send a DELETE request to your API to delete the Avião
      axios.delete(`http://localhost:8000/api/nacionais/${nacionalId}/`)
        .then(() => {
          // Update the state to reflect the deletion
          setNacionais(nacionais.filter((nacional) => nacional.id !== nacionalId));
        })
        .catch((error) => {
          console.error('Error deleting Voo Internacional:', error);
        });
    };
  
    return (
        <div className="container-fluid">
          <h3 className="m-4">Voos Nacionais</h3>
          <div className="row">
            <div className="col-12">
              <div class="lead m-4">
                <Link className="btn btn-primary btn-lg" to="/aN" >
                  Adicionar
                </Link>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : nacionais.length > 0 ? (
                <div className="card bg-light ms-4 me-4 mb-4">
                  <div className="card-header">
                  <h5><FontAwesomeIcon icon={faTableList}/> Lista de Voos Nacionais</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Código</th>
                              <th scope="col">Tipo</th>
                              <th scope="col">Companhia Aérea</th>
                              <th scope="col">Cidade Destino</th>
                              <th scope="col">Cidade Origem</th>
                              <th scope="col">Data</th>
                              <th scope="col">Hora</th>
                              <th scope="col">Avião</th>
                              <th scope="col">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {nacionais.map((item) => (
                              <tr key={item.id}>
                                <td>{item.codigo}</td>
                                <td>{item.entrante ? 'Entrante' : 'Cessante'}</td>
                                <td>{item.id_companhia_aerea}</td>
                                <td>{item.cidadeD}</td>
                                <td>{item.cidadeO}</td>
                                <td>{item.data}</td>
                                <td>{item.hora}</td>
                                <td>{item.id_aviao}</td>
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
                <h5 className="alert alert-primary ms-4 me-4">Sem Registros de Voos Nacionais</h5>
              )}
            </div>
          </div>
        </div>
      );
    }

export default Nacional;
