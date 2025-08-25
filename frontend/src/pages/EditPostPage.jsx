import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PostForm from "../components/PostForm";

const EditPostPage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <PostForm isEditing={true} postId={id} />
    </Layout>
  );
};

export default EditPostPage;
