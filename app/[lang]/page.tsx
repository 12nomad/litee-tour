import { notFound } from "next/navigation";

import PostCard from "../../components/post/PostCard";
import Posts from "../../components/post/Posts";
import Cta from "../../components/ui/Cta";
import { StrapiPost } from "../../interfaces/strapi.interface";

const getPosts = async (params?: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=*&publicationState=live&${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  return req.json();
};

export default async function Home({ params }: { params: { lang: string } }) {
  if (!params.lang) notFound();

  const { data }: { data: StrapiPost[] } = await getPosts(
    `locale=${params.lang}`
  );

  if (!data || data.length === 0) notFound();

  return (
    <main className="h-auto space-y-10">
      <PostCard post={data[0]} lang={params.lang} />
      <Posts
        lang={params.lang}
        posts={data.filter((_, idx) => idx > 0 && idx < 3)}
      />

      <Cta lang={params.lang} />

      <PostCard post={data[3]} reverse={true} lang={params.lang} />
      <Posts
        lang={params.lang}
        posts={data.filter((_, idx) => idx > 3 && idx < 6)}
      />
    </main>
  );
}
