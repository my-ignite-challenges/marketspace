import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const theme = DefaultTheme;

  const user_id = "1";

  return (
    <NavigationContainer theme={theme}>
      {user_id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
