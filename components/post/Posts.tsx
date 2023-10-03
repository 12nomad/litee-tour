import { StrapiPost } from "../../interfaces/strapi.interface";
import PostCard from "./PostCard";

interface IPosts {
  // posts: Post[];
  posts: StrapiPost[];
  lang: string;
  layout?: "vertical" | "horizontal";
}

const Posts = ({ posts, lang, layout = "vertical" }: IPosts) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
      {posts.map((post) => (
        <PostCard lang={lang} layout={layout} post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
