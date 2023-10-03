import Link from "next/link";
import Image from "next/image";

import PostContent from "./PostContent";
import { StrapiPost } from "../../interfaces/strapi.interface";

interface IPostCard {
  post: StrapiPost;
  lang: string;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
}

const PostCard = ({
  post,
  lang,
  layout = "horizontal",
  reverse = false,
}: IPostCard) => {
  return (
    <div>
      <Link
        className={`@container block ${
          layout === "horizontal"
            ? "grid items-center grid-cols-1 md:grid-cols-2 gap-10"
            : "space-y-10"
        } `}
        href={`/${lang}/post/${post.attributes.slug}`}
      >
        <Image
          className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${
            reverse ? "md:order-last" : ""
          }`}
          alt={post.attributes.title}
          src={post.attributes.image.data.attributes.url}
          width={600}
          height={300}
        />
        <PostContent post={post} lang={lang} />
      </Link>
    </div>
  );
};

export default PostCard;
