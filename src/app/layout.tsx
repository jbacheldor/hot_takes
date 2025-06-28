'use client';
import './globals.css';
import localFont from 'next/font/local';
import { Header } from 'hottake/components/Header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const orelegaOne = localFont({
  src: 'Lemon-Regular.ttf',
  display: 'swap',
  weight: '400',
  variable: '--font-my-font',
});

function NavigationBar() {
  const searchParams = useSearchParams();
  const game_id = searchParams.get('game_id');

  if (!game_id) {
    return null;
  }

  return (
    <>
      <div id="navigationBar">
        <a href={'/creategame'}>Create New Game</a>
        <a href={'/createhottake?game_id=' + game_id}>Create Hot Take</a>
        <a href={'/castvotes?game_id=' + game_id}>Cast Votes</a>
        <a href={'/results?game_id=' + game_id}>Results</a>
        <a href={'/guessers?game_id=' + game_id}>Guessers</a>
      </div>
      <hr />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orelegaOne.variable}`}>
        <Header />
        <Suspense fallback={<div>loading...</div>}>
          <NavigationBar />
        </Suspense>
        <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
