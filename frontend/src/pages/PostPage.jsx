// pages/PostPage.jsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePostStore } from "../store/usePostStore";
import DeleteButton from "../components/DeleteButton";

const PostPage = () => {
  const { id } = useParams();
  const { currentPost, loading, error, fetchPost } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading post...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to all posts
          </Link>
        </div>
      </Layout>
    );
  }

  if (!currentPost) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to all posts
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(currentPost.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all posts
        </Link>

        {currentPost.image && (
          <div className="mb-8">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentPost.title}
          </h1>
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">{formattedDate}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
            {currentPost.content}
          </div>
        </div>

        <div className="border-t pt-8 mt-8 flex justify-between items-center">
          <Link
            to={`/admin/edit/${currentPost._id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
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
            Edit Post
          </Link>
          <DeleteButton
            postId={currentPost._id}
            postTitle={currentPost.title}
          />
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;
