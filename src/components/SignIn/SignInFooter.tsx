import { Text, VStack } from "native-base";

import { Button } from "../Button";

export function SignInFooter() {
  return (
    <VStack position="absolute" top={656} alignItems="center" w="full" px={12}>
      <Text color="gray.600">Ainda não tem acesso?</Text>
      <Button
        title="Criar uma conta"
        textColor="gray.600"
        bgColor="gray.300"
        w="full"
        mt={4}
      />
    </VStack>
  );
}
