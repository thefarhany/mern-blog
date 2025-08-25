import { create } from "zustand";
import { postService } from "../services/postService";

export const usePostStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await postService.getPosts();
      set({ posts: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
    }
  },

  fetchPost: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await postService.getPost(id);
      set({ currentPost: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
    }
  },

  createNewPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      await postService.createPost(postData);
      get().fetchPosts();
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
      throw error;
    }
  },

  updateSinglePost: async (id, postData) => {
    set({ loading: true, error: null });
    try {
      await postService.updatePost(id, postData);
      get().fetchPosts();
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
      throw error;
    }
  },

  deleteSinglePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await postService.deletePost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
      throw error;
    }
  },
}));
