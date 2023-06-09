import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, VStack } from "native-base";

import { Button } from "../components/Button";
import { SignUpForm } from "../components/SignUp/SignUpForm";

import { AuthStackNavigatorRoutes } from "../routes/auth.routes";

import Logo from "../assets/logo-image.png";

export function SignUp() {
  const { navigate } = useNavigation<AuthStackNavigatorRoutes>();

  return (
    <ScrollView flex={1} bgColor="gray.200" px={12}>
      <VStack alignItems="center">
        <VStack w="full" alignItems="center" mt={16}>
          <Image source={Logo} alt="Logo" />
          <Text mt="18px" fontFamily="heading" fontSize="xl" color="gray.700">
            Boas vindas!
          </Text>
          <Text mt={2} color="gray.600" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </VStack>

        <SignUpForm />
      </VStack>

      <VStack mt={12} alignItems="center" w="full" pb={12}>
        <Text color="gray.600">Já tem uma conta?</Text>
        <Button
          title="Ir para o login"
          textColor="gray.600"
          bgColor="gray.300"
          w="full"
          mt={4}
          onPress={() => navigate("SignIn")}
        />
      </VStack>
    </ScrollView>
  );
}
