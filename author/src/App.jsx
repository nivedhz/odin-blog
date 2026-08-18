import "./styles/App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { loading } = useAuth();
  return (
    <div className="app__main-container">
      {loading ? (
        <div className="app__loading-container">
          <LoadingSpinner loading={loading} />
        </div>
      ) : (
        <div className="app__content-container">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
