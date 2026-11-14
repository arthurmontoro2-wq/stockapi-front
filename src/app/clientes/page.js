'use client';

import { useState, useEffect } from 'react';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes');
        const dados = await res.json();
        setClientes(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar clientes.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div className="card">
      <h2>Tabela de Clientes</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert-erro">{erro}</div>}

      {!carregando && !erro && clientes.length === 0 && (
        <p style={{ color: '#64748b' }}>Nenhum cliente encontrado.</p>
      )}

      {!carregando && !erro && clientes.length > 0 && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td><strong>{c.nome}</strong></td>
                  <td>{c.email || '-'}</td>
                  <td>{c.telefone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
