

import { useState } from 'react';

const Page = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [gear, setGear] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

   
    const requestData = {
      brand,
      model,
      fuel,
      gear,
      engine_size: parseFloat(engineSize), 
      year_model: parseInt(yearModel),     
    };

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error('Falha na requisição');
      }

      const data = await res.json();
      setResponse(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Previsão de Preço de Carro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Marca:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Modelo:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Combustível:</label>
          <input
            type="text"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Câmbio:</label>
          <input
            type="text"
            value={gear}
            onChange={(e) => setGear(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tamanho do Motor:</label>
          <input
            type="number"
            step="0.1"
            value={engineSize}
            onChange={(e) => setEngineSize(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ano do Modelo:</label>
          <input
            type="number"
            value={yearModel}
            onChange={(e) => setYearModel(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Enviar Dados'}
        </button>
      </form>

      {response && (
        <div>
          <h2>Preço Predito: {response.Preco}</h2>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Page;
