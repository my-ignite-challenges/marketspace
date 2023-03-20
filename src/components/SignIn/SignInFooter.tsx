import { useNavigation } from "@react-navigation/native";
import { Text, VStack } from "native-base";

import { Button } from "../Button";

import { AuthStackNavigatorRoutes } from "../../routes/auth.routes";

export function SignInFooter() {
  const { navigate } = useNavigation<AuthStackNavigatorRoutes>();

  return (
    <VStack position="absolute" top={656} alignItems="center" w="full" px={12}>
      <Text color="gray.600">Ainda não tem acesso?</Text>
      <Button
        title="Criar uma conta"
        textColor="gray.600"
        bgColor="gray.300"
        w="full"
        mt={4}
        onPress={() => navigate("SignUp")}
      />
    </VStack>
  );
}
