import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

const CreatePostPage = () => {
  return (
    <Layout>
      <PostForm isEditing={false} />
    </Layout>
  );
};

export default CreatePostPage;
