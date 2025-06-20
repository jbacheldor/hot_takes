'use client';
import './globals.css';
import localFont from 'next/font/local';
import { Header } from 'hottake/components/Header';
import { useSearchParams } from 'next/navigation';

const orelegaOne = localFont({
  src: 'Lemon-Regular.ttf',
  display: 'swap',
  weight: '400',
  variable: '--font-my-font',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();

  const game_id = searchParams.get('game_id');
  if (game_id) {
    return (
      <html lang="en">
        <body className={`${orelegaOne.variable}`}>
          <Header />
          <div id="navigationBar">
            <a href={'/creategame'}>Create New Game</a>
            <a href={'/createhottake?game_id=' + game_id}>Create Hot Take</a>
            <a href={'/castvotes?game_id=' + game_id}>Cast Votes</a>
            <a href={'/results?game_id=' + game_id}>Results</a>
            <a href={'/guessers?game_id=' + game_id}>Guessers</a>
          </div>
          <hr />
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={`${orelegaOne.variable}`}>
          <Header />
          {children}
        </body>
      </html>
    );
  }
}
