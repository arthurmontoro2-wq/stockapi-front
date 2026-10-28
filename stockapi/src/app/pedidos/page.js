'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregarDados() {
    setCarregando(true);
    setErro(null);

    try {
      const [resPedidos, resClientes, resProdutos, resItens] = await Promise.all([
        fetch('/api/pedidos'),
        fetch('/api/clientes'),
        fetch('/api/produtos'),
        fetch('/api/itens_pedido')
      ]);

      const dadosPedidos = await resPedidos.json();
      const dadosClientes = await resClientes.json();
      const dadosProdutos = await resProdutos.json();
      const dadosItens = await resItens.json();

      setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
      setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
      setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      setItens(Array.isArray(dadosItens) ? dadosItens : []);
    } catch (err) {
      console.error(err);
      setErro('Erro ao carregar pedidos.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function getCliente(clienteId) {
    const c = clientes.find((item) => Number(item.id) === Number(clienteId));
    return c ? c.nome : `Cliente #${clienteId}`;
  }

  function getProduto(produtoId) {
    const p = produtos.find((item) => Number(item.id) === Number(produtoId));
    return p ? p.nome : `Produto #${produtoId}`;
  }

  function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function formatarData(dataStr) {
    if (!dataStr) return '-';
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  // Ordena os pedidos do mais recente para o mais antigo (maior ID primeiro)
  const pedidosOrdenados = [...pedidos].sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h2>Pedidos</h2>
        <Link href="/criar-pedido" className="btn btn-primary">
          Novo Pedido
        </Link>
      </div>

      {carregando && (
        <div className="card">
          <p>Carregando pedidos...</p>
        </div>
      )}

      {erro && (
        <div className="alert-erro">
          <p>{erro}</p>
          <button onClick={carregarDados} className="btn btn-secondary" style={{ marginTop: '10px' }}>
            Recarregar
          </button>
        </div>
      )}

      {!carregando && !erro && pedidosOrdenados.length === 0 && (
        <div className="card">
          <p>Nenhum pedido cadastrado.</p>
        </div>
      )}

      {!carregando && !erro && pedidosOrdenados.map((pedido) => {
        const itensDoPedido = itens.filter(
          (item) => Number(item.pedido_numero) === Number(pedido.id) || Number(item.pedido_id) === Number(pedido.id)
        );

        const totalPedido = itensDoPedido.reduce((soma, item) => {
          return soma + (Number(item.preco_unitario) || 0) * (Number(item.quantidade) || 0);
        }, 0);

        return (
          <div key={pedido.id} className="pedido-card">
            <div className="pedido-header">
              <div>
                <strong>Pedido #{pedido.id}</strong> — Cliente: <strong>{getCliente(pedido.cliente_id)}</strong>
              </div>
              <div>
                <span style={{ marginRight: '10px', fontSize: '0.9rem', color: '#64748b' }}>
                  {formatarData(pedido.data_pedido)}
                </span>
                <span className={`badge badge-${pedido.status}`}>
                  {pedido.status}
                </span>
              </div>
            </div>

            <div className="itens-lista">
              <h4>Itens do Pedido:</h4>
              {itensDoPedido.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nenhum item cadastrado.</p>
              ) : (
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensDoPedido.map((item) => {
                        const subtotal = (Number(item.preco_unitario) || 0) * (Number(item.quantidade) || 0);
                        return (
                          <tr key={item.id}>
                            <td>{getProduto(item.produto_id)}</td>
                            <td>{item.quantidade}</td>
                            <td>{formatarMoeda(item.preco_unitario)}</td>
                            <td>{formatarMoeda(subtotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div style={{ textAlign: 'right', marginTop: '10px', fontWeight: 'bold' }}>
                    Total: {formatarMoeda(totalPedido)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
