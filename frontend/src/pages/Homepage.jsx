import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h1>
        <PostList />
      </div>
    </Layout>
  );
};

export default Homepage;
