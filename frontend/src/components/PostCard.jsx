import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-500 text-sm">{formattedDate}</p>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/admin/edit/${post._id}`}
            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200"
          >
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Link>
          <DeleteButton postId={post._id} postTitle={post.title} />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        <Link
          to={`/post/${post._id}`}
          className="hover:text-blue-600 hover:underline"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {post.content.substring(0, 200)}...
      </p>

      <div className="flex justify-between items-center">
        <Link
          to={`/post/${post._id}`}
          className="inline-flex items-center text-blue-600 font-medium hover:underline"
        >
          Read more
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <span className="text-sm text-gray-500">
          {Math.ceil(post.content.length / 1000)} min read
        </span>
      </div>
    </article>
  );
};

export default PostCard;
