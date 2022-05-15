import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import ProfilePage from "./pages/profile/ProfilePage";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  AuthContext,
  AuthContextProvider,
} from "components/context/AuthContext";
import { useContext } from "react";

function App() {
  const client = new QueryClient();
  const user = useContext(AuthContext);
  console.log("user", user);

  return (
    <div>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="profile/:username" element={<ProfilePage />} />
                </Route>
                <Route path="register" element={<RegisterPage />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
