import Center from "../components/center";
import Left from "../components/left";
import Right from "../components/right";
import "../sass/userH.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function UserHome() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div
          style={{ display: "flex", backgroundColor: "rgba(65, 0, 95, 0.137)" }}
        >
          <Left />
          <Center />
          <Right />
        </div>
      </QueryClientProvider>
    </>
  );
}
