import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import ProfilePage from "./pages/profile/ProfilePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
