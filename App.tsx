import { Box, NativeBaseProvider } from "native-base";
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { Loading } from "./src/components/Loading";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          Hello, Marketspot!!
        </Box>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
