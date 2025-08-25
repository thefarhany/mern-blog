import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PostPage from "./pages/PostPage";
import AdminPage from "./pages/AdminPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/create" element={<CreatePostPage />} />
        <Route path="/admin/edit/:id" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
