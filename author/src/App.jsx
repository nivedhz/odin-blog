import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { ScrollProvider } from "./providers/ScrollProvider";

function App() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
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
