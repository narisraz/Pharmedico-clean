import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="Titre">
    <Link href="/about">
      <a>About</a>
    </Link>
  </Layout>
);

export default IndexPage;
