import { useState } from "react";
import { usePostStore } from "../store/usePostStore";

const DeleteButton = ({ postId, postTitle }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { deleteSinglePost, loading } = usePostStore();

  const handleDelete = async () => {
    try {
      await deleteSinglePost(postId);
      setIsConfirming(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center space-x-2 bg-red-50 p-2 rounded-lg">
        <span className="text-sm text-red-700">Delete "{postTitle}"?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Yes"}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 transition-colors"
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete
    </button>
  );
};

export default DeleteButton;
