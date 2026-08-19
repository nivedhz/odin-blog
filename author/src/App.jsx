import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { loading } = useAuth();
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <LoadingSpinner loading={loading} />
        </div>
      ) : (
        <div className="app__main-container">
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
