import Markdown from "react-markdown";

interface IPostBody {
  body: string;
}

const PostBody = ({ body }: IPostBody) => {
  return (
    <Markdown className="mt-4 mb-10 space-y-2 [&>h2]:text-xl [&>h2]:text-neutral-800 text-neutral-800 [&>p]:text-neutral-600">
      {body}
    </Markdown>
  );
};

export default PostBody;
