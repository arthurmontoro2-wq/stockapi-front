'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo" onClick={() => setMenuAberto(false)}>
          Controle de Estoque
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Menu"
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${menuAberto ? 'open' : ''}`}>
          <Link href="/" onClick={() => setMenuAberto(false)}>
            Início
          </Link>
          <Link href="/categorias" onClick={() => setMenuAberto(false)}>
            Categorias
          </Link>
          <Link href="/produtos" onClick={() => setMenuAberto(false)}>
            Produtos
          </Link>
          <Link href="/clientes" onClick={() => setMenuAberto(false)}>
            Clientes
          </Link>
          <Link href="/pedidos" onClick={() => setMenuAberto(false)}>
            Pedidos
          </Link>
          <Link href="/criar-pedido" className="btn-nav" onClick={() => setMenuAberto(false)}>
            Novo Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
