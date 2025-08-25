import React, { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { useNavigate } from "react-router-dom";

const PostForm = ({ postId, isEditing = false }) => {
  const navigate = useNavigate();
  const {
    createNewPost,
    updateSinglePost,
    currentPost,
    fetchPost,
    loading,
    error,
  } = usePostStore();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (isEditing && postId) {
      fetchPost(postId);
    }
  }, [isEditing, postId, fetchPost]);

  useEffect(() => {
    if (isEditing && currentPost) {
      setPostData({
        title: currentPost.title || "",
        content: currentPost.content || "",
        image: currentPost.image || "",
      });
    }
  }, [isEditing, currentPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateSinglePost(postId, postData);
      } else {
        await createNewPost(postData);
      }

      navigate("/");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isEditing && loading && !currentPost) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isEditing ? "Edit Post" : "Create New Post"}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter post title..."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            required
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={postData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://example.com/image.jpg"
          />
          {postData.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Image preview:</p>
              <img
                src={postData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isEditing ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
