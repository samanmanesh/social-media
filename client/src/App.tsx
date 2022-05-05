import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import ProfilePage from "./pages/profile/ProfilePage";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
