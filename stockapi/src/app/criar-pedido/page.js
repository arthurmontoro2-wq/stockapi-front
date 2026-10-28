'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CriarPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itensDoPedido, setItensDoPedido] = useState([]);

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          fetch('/api/clientes'),
          fetch('/api/produtos')
        ]);

        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();

        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (err) {
        console.error(err);
        setMensagemErro('Erro ao carregar clientes e produtos.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function handleAdicionarProduto(e) {
    e.preventDefault();
    setMensagemErro('');

    if (!produtoId) {
      setMensagemErro('Selecione um produto.');
      return;
    }

    const qtd = Number(quantidade);
    if (qtd <= 0) {
      setMensagemErro('Informe uma quantidade válida.');
      return;
    }

    const produto = produtos.find((p) => p.id === Number(produtoId));
    if (!produto) return;

    const itemExistente = itensDoPedido.find((item) => item.produto_id === produto.id);

    if (itemExistente) {
      setItensDoPedido(
        itensDoPedido.map((item) =>
          item.produto_id === produto.id
            ? { ...item, quantidade: item.quantidade + qtd }
            : item
        )
      );
    } else {
      setItensDoPedido([
        ...itensDoPedido,
        {
          produto_id: produto.id,
          nome: produto.nome,
          preco_unitario: Number(produto.preco) || 0,
          quantidade: qtd
        }
      ]);
    }

    setProdutoId('');
    setQuantidade(1);
  }

  function handleRemoverItem(idParaRemover) {
    setItensDoPedido(itensDoPedido.filter((item) => item.produto_id !== idParaRemover));
  }

  async function handleSalvarPedido(e) {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!clienteId) {
      setMensagemErro('Selecione um cliente.');
      return;
    }

    if (itensDoPedido.length === 0) {
      setMensagemErro('Adicione pelo menos um produto ao pedido.');
      return;
    }

    setSalvando(true);

    try {
      const resPedido = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: Number(clienteId),
          status: 'pendente'
        })
      });

      const pedidoCriado = await resPedido.json().catch(() => ({}));

      if (!resPedido.ok) {
        const msg = pedidoCriado.erro || (pedidoCriado.erros && pedidoCriado.erros.join(', ')) || 'Erro ao criar pedido na API.';
        throw new Error(msg);
      }

      for (const item of itensDoPedido) {
        const resItem = await fetch('/api/itens_pedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedido_id: Number(pedidoCriado.id),
            produto_id: Number(item.produto_id),
            quantidade: Number(item.quantidade),
            preco_unitario: Number(item.preco_unitario)
          })
        });

        if (!resItem.ok) {
          const itemErro = await resItem.json().catch(() => ({}));
          const msg = itemErro.erro || (itemErro.erros && itemErro.erros.join(', ')) || 'Erro ao vincular item ao pedido.';
          throw new Error(msg);
        }
      }

      setMensagemSucesso(`Pedido #${pedidoCriado.id} criado com sucesso! Redirecionando...`);

      setTimeout(() => {
        router.push('/pedidos');
      }, 1500);
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
      setMensagemErro(err.message || 'Erro ao salvar pedido.');
    } finally {
      setSalvando(false);
    }
  }

  const totalGeral = itensDoPedido.reduce(
    (total, item) => total + item.preco_unitario * item.quantidade,
    0
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Formulário de Novo Pedido</h2>
        <Link href="/pedidos" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      {mensagemSucesso && <div className="alert-sucesso">{mensagemSucesso}</div>}
      {mensagemErro && <div className="alert-erro">{mensagemErro}</div>}

      {carregando ? (
        <div className="card">
          <p>Carregando...</p>
        </div>
      ) : (
        <div>
          <div className="card">
            <h3>Seleção de Cliente</h3>
            <div className="form-group">
              <label htmlFor="cliente">Selecione o Cliente</label>
              <select
                id="cliente"
                className="form-control"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome} ({c.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="card">
            <h3>Inclusão de Produtos</h3>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label htmlFor="produto">Produto</label>
                <select
                  id="produto"
                  className="form-control"
                  value={produtoId}
                  onChange={(e) => setProdutoId(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} - R$ {Number(p.preco).toFixed(2)} (Estoque: {p.quantidade_estoque})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  id="quantidade"
                  type="number"
                  min="1"
                  className="form-control"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button
                  type="button"
                  onClick={handleAdicionarProduto}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>Tabela de Itens do Pedido ({itensDoPedido.length}):</h4>

              {itensDoPedido.length === 0 ? (
                <p style={{ color: '#64748b', marginTop: '8px' }}>
                  Nenhum produto adicionado ainda.
                </p>
              ) : (
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Preço Unitário</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensDoPedido.map((item) => (
                        <tr key={item.produto_id}>
                          <td>{item.nome}</td>
                          <td>R$ {item.preco_unitario.toFixed(2)}</td>
                          <td>{item.quantidade}</td>
                          <td>R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleRemoverItem(item.produto_id)}
                              className="btn btn-danger"
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Total do Pedido: R$ {totalGeral.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={handleSalvarPedido}
              disabled={salvando}
              className="btn btn-success"
              style={{ fontSize: '1rem', padding: '10px 20px' }}
            >
              {salvando ? 'Salvando...' : 'Salvar Pedido'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
