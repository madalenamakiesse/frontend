import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AddCompanhia() {
  
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    numero_de_aeronaves: '',
    nacionalidade: '',
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
      const response = await axios.post('http://localhost:8000/api/createCompanhia/', formData);

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
      <h3 class="text-center m-4">Adicionar Companhia Aérea</h3>
      {isSuccess ? (
        <div class="alert alert-success" role="alert">
            Companhia Aérea adicionada com sucesso!
                  <Link class="alert-link" to="/companhia">   Voltar para a página anterior</Link>
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
                    <label htmlFor="nome" class="form-label mt-4">Nome</label>
                    <input
                        class="form-control"
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="numero_de_aeronaves" class="form-label mt-4">Número de Aeronaves</label>
                    <input
                        class="form-control"
                        type="number"
                        id="numero_de_aeronaves"
                        name="numero_de_aeronaves"
                        required
                        value={formData.numero_de_aeronaves}
                        onChange={handleChange}
                    />
                    </div>
                    <div class="form-group">
                    <label htmlFor="nacionalidade" class="form-label mt-4">Nacionalidade</label>
                    <input
                        class="form-control"
                        type="text"
                        id="nacionalidade"
                        required
                        name="nacionalidade"
                        value={formData.nacionalidade}
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

export default AddCompanhia;
