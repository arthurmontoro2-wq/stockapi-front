'use client';

import { useState, useEffect } from 'react';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch('/api/categorias');
        const dados = await res.json();
        setCategorias(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar categorias.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div className="card">
      <h2>Categorias</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert-erro">{erro}</div>}

      {!carregando && !erro && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id}>
                  <td>#{cat.id}</td>
                  <td><strong>{cat.nome}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
