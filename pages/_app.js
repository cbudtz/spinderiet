import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="http://umami.4a4b.dk/script.js"
        data-website-id="c6b3e44d-362b-42a6-829a-02a381e845b3"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
