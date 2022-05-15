import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { FeedPage } from "./feed/components";
import { AuthProvider } from "auth";

function App() {
  const client = new QueryClient();

  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<FeedPage />} />
                <Route path="profile/:username" element={<ProfilePage />} />
              </Route>
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}
export default App;
