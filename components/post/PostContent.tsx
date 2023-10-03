import { StrapiPost } from "../../interfaces/strapi.interface";
import getDictionary from "../../utils/dictionary.util";
import getReadingTime from "../../utils/reading-time.util";
import getRelativeTime from "../../utils/relative-time.util";

interface IPostContent {
  // post: Post;
  post: StrapiPost;
  lang: string;
  isPostDetail?: boolean;
}

const PostContent = async ({
  post,
  lang,
  isPostDetail = false,
}: IPostContent) => {
  const dictionary = await getDictionary(lang);

  return (
    <div className="space-y-2">
      <div
        className={`flex items-center flex-wrap gap-2  text-neutral-400 ${
          isPostDetail ? "text-sm" : "text-xs @md:text-sm"
        }`}
      >
        <div
          className={`font-medium ${
            post.attributes.category.data.attributes.title === "Tour"
              ? "text-green-sea"
              : "text-purple-marian"
          }`}
        >
          {post.attributes.category.data.attributes.title}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${post.attributes.admin_user.data.attributes.firstname} ${post.attributes.admin_user.data.attributes.lastname}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getReadingTime(post.attributes.body, lang)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getRelativeTime(post.attributes.createdAt, lang)}</div>
      </div>
      <h2
        className={`${
          isPostDetail
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-3xl text-xl @md:text-2xl font-medium"
        } `}
      >
        {post.attributes.title}
      </h2>
      <p className="text-base @lg:text-lg leading-snug text-neutral-600">
        {post.attributes.description}
      </p>
      {!isPostDetail && (
        <div className="pt-3">{dictionary.buttons.readMore} &rarr;</div>
      )}
    </div>
  );
};

export default PostContent;
