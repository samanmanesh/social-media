import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./profile/ProfilePage";
import Layout from "./layout/Layout";
import LoginPage, { RequireAuth } from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { FeedPage } from "./feed/components";
import { AuthProvider } from "auth";
import { Toaster } from "react-hot-toast";
import SettingPage from "accounts/SettingPage";

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
                <Route
                  index
                  element={
                    <RequireAuth>
                      <FeedPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="profile/:username"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="accounts/edit"
                  element={
                    <RequireAuth>
                      <SettingPage />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
      <Toaster />
    </div>
  );
}
export default App;
