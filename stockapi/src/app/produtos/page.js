'use client';

import { useState, useEffect } from 'react';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [resProdutos, resCategorias] = await Promise.all([
          fetch('/api/produtos'),
          fetch('/api/categorias')
        ]);

        const dadosProdutos = await resProdutos.json();
        const dadosCategorias = await resCategorias.json();

        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar produtos.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function getCategoria(id) {
    const cat = categorias.find((c) => Number(c.id) === Number(id));
    return cat ? cat.nome : '-';
  }

  return (
    <div className="card">
      <h2>Tabela de Produtos</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert-erro">{erro}</div>}

      {!carregando && !erro && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td><strong>{p.nome}</strong></td>
                  <td style={{ color: '#64748b' }}>{p.descricao || '-'}</td>
                  <td>{getCategoria(p.categoria_id)}</td>
                  <td>R$ {Number(p.preco).toFixed(2)}</td>
                  <td>
                    <span style={{ fontWeight: 'bold', color: p.quantidade_estoque > 0 ? '#16a34a' : '#dc2626' }}>
                      {p.quantidade_estoque}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
