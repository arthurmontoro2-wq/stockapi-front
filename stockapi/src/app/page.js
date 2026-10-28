import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="card">
        <h1>Sistema de Controle de Estoque</h1>
        <p style={{ marginTop: '6px', color: '#475569' }}>
          Atividade de Desenvolvimento Front-End - 4º Bimestre
        </p>

        <div style={{ marginTop: '16px', padding: '12px', background: '#f1f5f9', borderRadius: '6px' }}>
          <p><strong>Feito por:</strong> Arthur Montoro - <i>The Best</i></p>
        </div>
      </div>

      <h2 style={{ margin: '24px 0 12px' }}>Painel de Navegação</h2>

      <div className="home-grid">
        <Link href="/pedidos" className="home-card-link">
          <div className="card">
            <h3>Lista de Pedidos</h3>
            <p>Visualizar todos os pedidos cadastrados e seus itens.</p>
          </div>
        </Link>

        <Link href="/criar-pedido" className="home-card-link">
          <div className="card">
            <h3>Formulário de Novo Pedido</h3>
            <p>Cadastrar um novo pedido com cliente e produtos.</p>
          </div>
        </Link>

        <Link href="/produtos" className="home-card-link">
          <div className="card">
            <h3>Tabela de Produtos</h3>
            <p>Consultar produtos, precos e estoque.</p>
          </div>
        </Link>

        <Link href="/categorias" className="home-card-link">
          <div className="card">
            <h3>Tabela de Categorias</h3>
            <p>Visualizar as categorias cadastradas.</p>
          </div>
        </Link>

        <Link href="/clientes" className="home-card-link">
          <div className="card">
            <h3>Tabela de Clientes</h3>
            <p>Consultar a lista de clientes e contatos.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
