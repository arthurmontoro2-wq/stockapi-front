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
      <h2>Tabela de Categorias</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert-erro">{erro}</div>}

      {!carregando && !erro && categorias.length === 0 && (
        <p style={{ color: '#64748b' }}>Nenhuma categoria encontrada.</p>
      )}

      {!carregando && !erro && categorias.length > 0 && (
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
