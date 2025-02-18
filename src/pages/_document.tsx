import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta name="description" content="Поиск изображений из Unsplash" />
        <meta property="og:title" content="Поиск изображений" />
        <meta property="og:description" content="Поиск и галерея изображений Unsplash." />
        <link rel="icon" href="@/../public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}