import { notFound } from "next/navigation";
import { cache } from "react";

import { StrapiCategory } from "../../../interfaces/strapi.interface";
import Posts from "../../../components/post/Posts";

interface IPage {
  params: { category: string; lang: string };
}

export const getCategories = cache(async (params?: string) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?publicationState=live&${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  return req.json();
});

export const generateMetadata = async ({ params }: IPage) => {
  const { data }: { data: StrapiCategory[] } = await getCategories(
    `filters[slug][$eq]=${params.category}&locale=${params.lang}`
  );
  return {
    title: data[0].attributes.title,
    description: data[0].attributes.description,
    openGraph: {
      title: data[0].attributes.title,
      description: data[0].attributes.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lang}/${params.category}`,
      sitename: data[0].attributes.title,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.category}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${params.category}`,
        fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/${params.category}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  const { data }: { data: StrapiCategory[] } = await getCategories(
    "locale=all"
  );
  return data.map((category) => ({ category: category.attributes.slug }));
};

const Page = async ({ params }: IPage) => {
  if (!params.category) notFound();

  const { data }: { data: StrapiCategory[] } = await getCategories(
    `populate[posts][populate]=*&filters[slug][$eq]=${params.category}&locale=${params.lang}`
  );

  if (!data || data.length === 0) notFound();

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">
          {data[0].attributes.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {data[0].attributes.description}
        </p>
      </div>
      <Posts posts={data[0].attributes.posts.data} lang={params.lang} />
    </>
  );
};

export default Page;
