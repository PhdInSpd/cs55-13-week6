import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';

// does eacht page have getStaticProps?
export async function getStaticProps() {
  const allData = getSortedList();
  return {
    props: {
      allData
    }
  }
}

export default function Home({ allData }) {
  return (
      <Layout home>
        <h1>List of Rancheras</h1>
        <div className="list-group">
          {allData.map(({ id, song }) => (
            <Link key={id} href={`/${id}`}>
              <a className="list-group-item list-group-item-action">{song}: {id}</a>
            </Link>
          ))}
        </div>
      </Layout>
  );
}
