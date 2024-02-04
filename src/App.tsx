import Router from "@/router/routes";
import { AuthProvider } from "@/usecases/auth/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
