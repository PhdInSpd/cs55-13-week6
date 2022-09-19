import Head from 'next/head';
import '../styles/bootstrap.min.css';
// has media queries
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>      
      <Component {...pageProps} />
      <Head>
        {/* this title does not update when placed before Component*/}
        <title>CS55.13 Assignment 05</title>
        <meta name='description' content='intro to next.js, Part1' />
        {/* required for responsive media querries */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head> 
    </>
  );
}

export default MyApp


