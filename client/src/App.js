import { Route, Routes } from "react-router-dom";
import "./style/style.scss";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import PublicLayout from "./components/public/PublicLayout";
import Home from "./pages/public/Home";
import DashLogin from "./components/general/DashLogin";
import AdminRoute from "./components/admin/AdminRoute";
import "swiper/css";
function App() {
  return (
    <div className="App">
      {/* Public pages */}
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
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
      <Routes>
        <Route path="/admin/login" element={<DashLogin />} />
      </Routes>
    </div>
  );
}

export default App;
