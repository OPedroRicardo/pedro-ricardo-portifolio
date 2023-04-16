import { Html, Head, Main, NextScript } from 'next/document'
import consolere from 'console-remote-client'

export default function Document() {
  consolere.connect({ channel: '#pedro-ricardo-portfolio' });
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
