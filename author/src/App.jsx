import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
