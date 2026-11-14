'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Início' },
    { href: '/categorias', label: 'Categorias' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/pedidos', label: 'Pedidos' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo" onClick={() => setMenuAberto(false)}>
          📦 Controle de Estoque
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuAberto}
        >
          {menuAberto ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${menuAberto ? 'open' : ''}`} aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/criar-pedido"
            className={`btn-nav ${pathname === '/criar-pedido' ? 'active' : ''}`}
            onClick={() => setMenuAberto(false)}
          >
            Novo Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
