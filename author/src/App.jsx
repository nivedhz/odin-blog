import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { loading } = useAuth();
  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center dark bg-background">
          <LoadingSpinner loading={loading} />
        </div>
      ) : (
        <div className="min-h-screen dark bg-background text-foreground">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
