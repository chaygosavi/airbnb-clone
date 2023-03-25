import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://localhost:9999";
axios.defaults.withCredentials = true;

const App = () => (
  <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/:subPage?" element={<AccountPage />} />
        {/* <Route path="/account/bookings" element={<AccountPage />} />
        <Route path="/account/places" element={<AccountPage />} /> */}
      </Route>
    </Routes>
  </UserContextProvider>
);

export default App;
