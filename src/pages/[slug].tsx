import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface PostDetailProps {
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PostDetailProps, Params> = async (context) => {
  const { slug } = context.params as Params;
  // Aqui você pode buscar detalhes do post usando o slug, ex:
  // const post = await fetchPostBySlug(slug);
  // return { props: { slug, post } };
  return {
    props: {
      slug,
    },
  };
};

export default function PostDetailPage({ slug }: PostDetailProps) {
  return <p>Post: {slug}</p>;
}
