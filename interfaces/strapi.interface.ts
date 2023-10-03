export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: null | string;
    caption: null | string;
    width: number;
    height: number;
    // formats: [Object];
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | string;
    provider: string;
    provider_metadata: null | Object;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiPost {
  id: string;
  attributes: {
    title: string;
    description: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;

    // author: StrapiAuthor;
    image: { data: StrapiImage };
    admin_user: { data: StrapiAuthor };
    category: { data: StrapiCategory };
  };
}

export interface StrapiCategory {
  id: string;
  attributes: {
    title: string;
    slug?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    posts: { data: StrapiPost[] };
  };
}

export interface StrapiAuthor {
  id: string;
  attributes: {
    firstname: string;
    lastname: string;
    username?: string;
    preferedLanguage?: string;
    createdAt: string;
    updatedAt: string;
  };
}
