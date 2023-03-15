import { Image, VStack } from "native-base";

import { SingInForm } from "./SignInForm";

import Logo from "../../assets/logo.png";

export function SignInTopBox() {
  return (
    <VStack
      bgColor="gray.200"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top={0}
      w="full"
      px={12}
      borderBottomLeftRadius="2xl"
      borderBottomRightRadius="2xl"
    >
      <Image source={Logo} alt="Logo" mt="109px" />
      <SingInForm />
    </VStack>
  );
}
