import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Controle de Estoque e Pedidos',
  description: 'Aplicação Front-End para controle de estoque e pedidos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
