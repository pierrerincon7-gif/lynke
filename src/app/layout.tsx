import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Loyalify | Plataforma SaaS de Fidelización de Clientes',
  description: 'Crea, administra y escala el programa de fidelización de tu negocio. Tarjetas digitales, puntos, sellos, recompensas y analíticas en una sola plataforma.',
  openGraph: {
    title: 'Loyalify | Fidelización de Clientes para tu Negocio',
    description: 'Transforma clientes casuales en clientes frecuentes con tarjetas digitales de fidelización.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
