import { MetadataRoute } from "next";

import { StrapiCategory, StrapiPost } from "../interfaces/strapi.interface";

const getPostsAndCategories = async () => {
  const [posts, categories] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?publicationState=live&locale=all`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?publicationState=live&locale=all`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      }
    ),
  ]);

  return { posts: posts.json(), categories: categories.json() };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { categories, posts } = await getPostsAndCategories();

  // [ [{}, {}, {}], ...]
  const postsLinks = await posts.then(({ data }: { data: StrapiPost[] }) => {
    return data.map((post) => [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.attributes.slug}`,
        lastModified: new Date(post.attributes.updatedAt),
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${post.attributes.slug}`,
        lastModified: new Date(post.attributes.updatedAt),
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/post/${post.attributes.slug}`,
        lastModified: new Date(post.attributes.updatedAt),
      },
    ]);
  });

  const categoriesLinks = await categories.then(
    ({ data }: { data: StrapiCategory[] }) => {
      return data.map((category) => [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.attributes.slug}`,
          lastModified: new Date(category.attributes.updatedAt),
        },
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category.attributes.slug}`,
          lastModified: new Date(category.attributes.updatedAt),
        },
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/${category.attributes.slug}`,
          lastModified: new Date(category.attributes.updatedAt),
        },
      ]);
    }
  );

  const sitemap = [...postsLinks.flat(), ...categoriesLinks.flat()].filter(
    (el) =>
      !(
        el.url.includes("/en/visite") ||
        el.url.includes("/en/expérience") ||
        el.url.includes("/fr/tour") ||
        el.url.includes("/fr/experience")
      )
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
      lastModified: new Date(),
    },
    ...sitemap,
  ];
}
