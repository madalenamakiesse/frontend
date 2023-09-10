import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddInternacional() {
  const [formData, setFormData] = useState({
    codigo: '',
    entrante: false,
    id_companhia_aerea: '',
    cidadeD: '',
    cidadeO: '',
    data: '',
    hora: '',
    id_aviao: '',
    pais_destino: '',
    numero_paises: '',
  });

  const [companhiasAereas, setCompanhiasAereas] = useState([]);
  const [avioes, setAvioes] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Fetch data for dropdown options (companhias aereas and avioes)
    const fetchData = async () => {
      try {
        const companhiasResponse = await axios.get('http://localhost:8000/api/companhias/');
        const avioesResponse = await axios.get('http://localhost:8000/api/avioes/');

        setCompanhiasAereas(companhiasResponse.data);
        setAvioes(avioesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/createInternacional/', formData);

      if (response.status === 201) {
        // Data successfully added, you can show a success message or redirect
        console.log('Data added successfully');
      } else {
        // Handle errors here
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsSuccess(true);

  };

  return (
    <div>
      <h3 class="text-center m-4">Adicionar Voo Internacional</h3>
      {isSuccess ? (
        <div class="alert alert-success" role="alert">
            Voo Internacional adicionado com sucesso!
                  <Link class="alert-link" to="/internacional">   Voltar para a página anterior</Link>
        </div>
      ) : (
      <div className="row justify-content-center">
          <div className="col-6">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label htmlFor="codigo" class="form-label mt-4">Código</label>
                      <input 
                          class="form-control"
                          type="text"
                          id="codigo"
                          name="codigo"
                          value={formData.codigo}
                          required
                          onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                        <label htmlFor="id_aviao" class="form-label mt-4">Avião</label>
                        <select
                            id="id_aviao"
                            class="form-select"
                            name="id_aviao"
                            value={formData.id_aviao}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um Avião</option>
                            {avioes.map((aviao) => (
                            <option key={aviao.id} value={aviao.id}>
                                {aviao.registro}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                        <label htmlFor="id_companhia_aerea" class="form-label mt-4">Companhia Aerea</label>
                        <select
                            id="id_companhia_aerea"
                            class="form-select"
                            name="id_companhia_aerea"
                            value={formData.id_companhia_aerea}
                            required
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma Companhia Aerea</option>
                            {companhiasAereas.map((companhia) => (
                            <option key={companhia.id} value={companhia.id}>
                                {companhia.codigo}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                    <label htmlFor="cidadeD" class="form-label mt-4">Cidade Destino</label>
                    <input
                        class="form-control"
                        type="text"
                        id="cidadeD"
                        name="cidadeD"
                        required
                        value={formData.cidadeD}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="cidadeO" class="form-label mt-4">Cidade Origem</label>
                    <input
                        class="form-control"
                        type="text"
                        id="cidadeO"
                        name="cidadeO"
                        required
                        value={formData.cidadeO}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                      <label htmlFor="pais_destino" class="form-label mt-4">País Destino</label>
                      <input
                          class="form-control"
                          type="text"
                          id="pais_destino"
                          name="pais_destino"
                          required
                          value={formData.pais_destino}
                          onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="numero_paises" class="form-label mt-4">Escala</label>
                      <input
                          class="form-control"
                          type="number"
                          id="numero_paises"
                          name="numero_paises"
                          required
                          value={formData.numero_paises}
                          onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="data" class="form-label mt-4">Data:</label>
                      <input
                          class="form-control"
                          type="date"
                          id="data"
                          required
                          name="data"
                          value={formData.data}
                          onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <label htmlFor="hora" class="form-label mt-4">Hora</label>
                      <input
                          class="form-control"
                          type="time"
                          id="hora"
                          required
                          name="hora"
                          value={formData.hora}
                          onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                    <label htmlFor="entrante" class="form-label mt-4">Entrante</label>
                    <div class="form-check" >
                        <input
                            type="checkbox"
                            class="form-check-input" 
                            id="entrante"
                            name="entrante"
                            checked={formData.entrante}
                            onChange={handleChange}
                        />
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" className="btn btn-primary me-2 mt-2">Adicionar</button>
                        <Link className="btn btn-secondary mt-2" to="/" >
                            Cancelar
                        </Link>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddInternacional;
