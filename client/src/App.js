import { Route, Routes } from "react-router-dom";
import "./style/style.scss";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PublicLayout from "./components/public/PublicLayout";
import Home from "./pages/public/Home";
import AdminRoute from "./components/admin/AdminRoute";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";
import ProfileLayout from "./components/public/ProfileLayout";
import Profile from "./pages/public/Profile";
import UserLoginInRoute from "./components/general/UserLoginInRoute";
import AddPost from "./pages/public/AddPost";
import MyPosts from "./pages/public/MyPosts";
import EditPost from "./pages/public/EditPost";
import Post from "./pages/public/Post";
import Messages from "./pages/public/Messages";

function App() {
  return (
    <div className="App">
      {/* Public pages */}
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route element={<UserLoginInRoute />}>
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="/profile/add-post" element={<AddPost />} />
              <Route path="/profile/my-posts" element={<MyPosts />} />
              <Route path="/profile/edit-post/:id" element={<EditPost />} />
              <Route path="/profile/messages" element={<Messages />} />
            </Route>
          </Route>
          <Route path="/posts/:id" element={<Post />} />
        </Route>
      </Routes>
      {/* Admin pages */}
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path="products" element={<AdminRoute></AdminRoute>} />
          <Route path="costumers" element={<AdminRoute></AdminRoute>} />
          <Route path="orders" element={<AdminRoute></AdminRoute>} />
          <Route path="sellers" element={<AdminRoute></AdminRoute>} />
          <Route path="setting" element={<AdminRoute></AdminRoute>} />
        </Route>
      </Routes>
      {/* Admin Login */}
      <Routes></Routes>
    </div>
  );
}

export default App;
