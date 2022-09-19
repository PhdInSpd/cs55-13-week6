import Head from 'next/head';
import Link from 'next/link';

// markup for global html
export default function Layout( { 
                                    // all markup to be shown
                                    children,
                                    // boolean home page
                                     home } ) {
  return (
    <div>
      <Head>
        <title>Basic Next.js App</title>
      </Head>
      <header>
        <nav>
          <a href="https://music.youtube.com/search?q=juan+gabriel">Juan Gabriel Youtube Music</a>
        </nav>
      </header>
      <main>{children}</main>
      {!home && (
          <Link href="/">
            <a class="btn btn-primary mt-3">← Back to home</a>
          </Link>
        )
      }
      {/* <footer>
        <p>The footer</p>
      </footer> */}
    </div>
  );
}