import { Outlet } from "react-router-dom";
import { ThemeContextProvider } from "./utils/themeContext";
import { Navbar } from "./components/navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </ThemeContextProvider>
      </QueryClientProvider>
    </>
  );
}
