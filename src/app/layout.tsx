import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Header } from 'hottake/components/Header';

const orelegaOne = localFont({
  src: 'Lemon-Regular.ttf',
  display: 'swap',
  weight: '400',
  variable: '--font-my-font',
});

export const metadata: Metadata = {
  title: 'Hot Ones',
  description: 'a fun game about hot takes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orelegaOne.variable}`}>
        <Header />
        <div id="navigationBar">
          <a href="/createhottake">Create Hot Take</a>
          <a href="/castvotes">Cast Votes</a>
          <a href="/results">Results</a>
          <a href="/guessers">Guessers</a>
        </div>
        <hr />
        {children}
      </body>
    </html>
  );
}
