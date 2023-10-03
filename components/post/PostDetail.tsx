import Image from "next/image";

import PostContent from "./PostContent";
import { StrapiPost } from "../../interfaces/strapi.interface";

interface IPostDetail {
  post: StrapiPost;
  lang: string;
}

const PostDetail = ({ post, lang }: IPostDetail) => {
  return (
    <div>
      <PostContent isPostDetail post={post} lang={lang} />
      <Image
        priority
        className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
        src={post.attributes.image.data.attributes.url}
        width={1280}
        height={500}
        alt={post.attributes.title}
      />
    </div>
  );
};

export default PostDetail;
