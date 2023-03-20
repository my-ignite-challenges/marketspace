import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

type AuthRoutesProps = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackNavigatorRoutes =
  NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
