import { notFound } from "next/navigation";

import PostDetail from "../../../../components/post/PostDetail";
import PostBody from "../../../../components/post/PostBody";
import Cta from "../../../../components/ui/Cta";
import { StrapiPost } from "../../../../interfaces/strapi.interface";

interface IPage {
  params: { slug: string; lang: string };
}

export const getPost = async (params?: string) => {
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

export const generateMetadata = async ({ params }: IPage) => {
  const { data }: { data: StrapiPost[] } = await getPost(
    `locale=${params.lang}&filters[slug][$eq]=${params.slug}`
  );

  return {
    title: data[0].attributes.title,
    description: data[0].attributes.description,
    openGraph: {
      title: data[0].attributes.title,
      description: data[0].attributes.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lang}/post/${data[0].attributes.slug}`,
      sitename: data[0].attributes.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].attributes.image}`,
          width: 1200,
          height: 628,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${params.slug}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${params.slug}`,
        fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/post/${params.slug}`,
      },
    },
  };
};

const Page = async ({ params }: IPage) => {
  if (!params.slug) notFound();

  const { data }: { data: StrapiPost[] } = await getPost(
    `locale=${params.lang}&filters[slug][$eq]=${params.slug}`
  );

  if (!data) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlocgArticle",
    headline: data[0].attributes.title,
    image: `${process.env.NEXT_PUBLIC_STRAPI_URL}${data[0].attributes.image}`,
    author: "OpenAI",
    genre: data[0].attributes.category,
    publisher: process.env.NEXT_PUBLIC_SITE_URL,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${params.slug}`,
    datePublished: new Date(data[0].attributes.createdAt).toISOString(),
    dateCreated: new Date(data[0].attributes.createdAt).toISOString(),
    dateModified: new Date(data[0].attributes.updatedAt).toISOString(),
    description: data[0].attributes.description,
    articleBody: data[0].attributes.body,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PostDetail post={data[0]} lang={params.lang} />
      <PostBody body={data[0].attributes.body} />
      <Cta lang={params.lang} />
    </>
  );
};

export default Page;
