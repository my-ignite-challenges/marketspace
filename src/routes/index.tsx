import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const theme = DefaultTheme;

  const { user, isStoredUserDataLoading } = useAuth();

  if (isStoredUserDataLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={theme}>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
