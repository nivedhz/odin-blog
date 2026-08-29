import Navbar from "#components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
