import { LogBox } from "react-native";

import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { Loading } from "./src/components/Loading";
import { AdDetails } from "./src/screens/AdDetails";
import { CreateAd } from "./src/screens/CreateAd";
import { Home } from "./src/screens/Home";
import { MyAds } from "./src/screens/MyAds";
import { SignIn } from "./src/screens/SignIn";
import { SignUp } from "./src/screens/SignUp";
import { THEME } from "./src/theme";
import { AdPreview } from "./src/screens/AdPreview";

LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      {fontsLoaded ? <AdPreview /> : <Loading />}
    </NativeBaseProvider>
  );
}
