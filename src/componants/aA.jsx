import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddAviao() {
  
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    registro: '',
    marca: '',
    modelo: '',
    numero_de_passageiros: '',
  });


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
      const response = await axios.post('http://localhost:8000/api/createAviao/', formData);

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
      <h3 class="text-center m-4">Adicionar Voo Avião</h3>
      {isSuccess ? (
        <div class="alert alert-success" role="alert">
            Avião adicionado com sucesso!
                  <Link class="alert-link" to="/aviao">   Voltar para a página anterior</Link>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                    <label htmlFor="registro" class="form-label mt-4">Registro</label>
                    <input 
                        class="form-control"
                        type="text"
                        id="registro"
                        name="registro"
                        value={formData.registro}
                        required
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="modelo" class="form-label mt-4">Modelo</label>
                    <input
                        class="form-control"
                        type="text"
                        id="modelo"
                        name="modelo"
                        required
                        value={formData.modelo}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="marca" class="form-label mt-4">Marca</label>
                    <input
                        class="form-control"
                        type="text"
                        id="marca"
                        name="marca"
                        required
                        value={formData.marca}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="numero_de_passageiros" class="form-label mt-4">Número de Passageiros</label>
                    <input
                        class="form-control"
                        type="number"
                        id="numero_de_passageiros"
                        required
                        name="numero_de_passageiros"
                        value={formData.numero_de_passageiros}
                        onChange={handleChange}
                    />
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

export default AddAviao;
