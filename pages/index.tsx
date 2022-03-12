import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header';
import {sanityClient, urlFor} from '../sanity'
import { Post } from '../typings';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>My AI Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* POSTS */}
      <div>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <img src={urlFor(post.mainImage).url()!} alt="" />
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};