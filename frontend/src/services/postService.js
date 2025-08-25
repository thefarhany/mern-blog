import apiClient from "./apiClient";

export const postService = {
  // GET All Posts
  getPosts: () => {
    return apiClient.get("/posts");
  },

  // GET Single Post by ID
  getPost: (id) => {
    return apiClient.get(`/posts/${id}`);
  },

  // CREATE New Post
  createPost: (postData) => {
    return apiClient.post("/posts", postData);
  },

  // UPDATE Post
  updatePost: (id, postData) => {
    return apiClient.put(`/posts/${id}`, postData);
  },

  // DELETE Post
  deletePost: (id) => {
    return apiClient.delete(`/posts/${id}`);
  },
};
