import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import { House, SignOut as SignOutIcon, Tag } from "phosphor-react-native";

import { AdDetails } from "../screens/AdDetails";
import { AdPreview } from "../screens/AdPreview";
import { CreateAd } from "../screens/CreateAd";
import { EditAd } from "../screens/EditAd";
import { Home } from "../screens/Home";
import { MyAds } from "../screens/MyAds";
import { MyAdDetails } from "../screens/MyAdDetails";
import { SignOut } from "../screens/SignOut";
import { useAuth } from "../hooks/useAuth";

type AppStackRoutes = {
  HomeTabs: undefined;
  AdDetails: { adId: string };
  AdPreview: { eventName: string };
  CreateAd: undefined;
  EditAd: { adId: string };
  MyAdDetails: { adId: string };
};

type HomeTabRoutes = {
  Home: undefined;
  MyAds: undefined;
  SignOut: undefined;
};

export type AppBottomTabNavigatorRoutes =
  BottomTabNavigationProp<HomeTabRoutes>;
export type AppStackNavigatorRoutes = NativeStackNavigationProp<AppStackRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutes>();
const { Navigator: HomeTabNavigator, Screen: HomeTabScreen } =
  createBottomTabNavigator<HomeTabRoutes>();

function HomeTabs() {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  return (
    <HomeTabNavigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          height: 72,
          borderTopWidth: 0,
        },
      }}
    >
      <HomeTabScreen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={24} />,
          tabBarIconStyle: {
            fontWeight: "700",
          },
        }}
      />

      <HomeTabScreen
        name="MyAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Tag color={color} size={24} />,
        }}
      />

      <HomeTabScreen
        name="SignOut"
        component={SignOut}
        options={{
          tabBarIcon: () => <SignOutIcon color={colors.red[500]} size={24} />,
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
            signOut();
          },
        })}
      />
    </HomeTabNavigator>
  );
}

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeTabs" component={HomeTabs} />

      <Screen name="AdPreview" component={AdPreview} />
      <Screen name="CreateAd" component={CreateAd} />
      <Screen name="EditAd" component={EditAd} />
      <Screen name="AdDetails" component={AdDetails} />
      <Screen name="MyAdDetails" component={MyAdDetails} />
    </Navigator>
  );
}
