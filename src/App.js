import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import UnfinishedPage from "./page/collection-page/UnfinishedPage";
import FinishedPage from "./page/collection-page/FinishedPage";
import FavoritePage from "./page/collection-page/FavoritePage";
import AllPage from "./page/collection-page/AllPage";
import SearchPage from "./page/collection-page/SearchPage";
import Layout from "./page/layout/Layout";
import NoLayout from "./page/layout/NoLayout";
import RegisterPage from "./page/RegisterPage";
import NotePage from "./page/NotePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/unfinishedPage" element={<UnfinishedPage />} />
          <Route path="/finishedPage" element={<FinishedPage />} />
          <Route path="/favoritePage" element={<FavoritePage />} />
          <Route path="/allPage" element={<AllPage />} />
          <Route path="/searchPage" element={<SearchPage />} />
        </Route>
        <Route element={<NoLayout />}>
          <Route path="/registerPage" element={<RegisterPage />} />
          <Route path="/notePage" element={<NotePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
