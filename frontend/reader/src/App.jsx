import Navbar from "#components/Navbar";
import { Outlet } from "react-router";
import { ScrollProvider } from "./providers/ScrollProvider.jsx";

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ScrollProvider>
    </div>
  );
}

export default App;
