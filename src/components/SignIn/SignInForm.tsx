import { Icon, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../Input";
import { Button } from "../Button";

export function SingInForm() {
  return (
    <VStack space={4} alignItems="center" mt="76px" pb="68px" w="full">
      <Text color="gray.600">Acesse sua conta</Text>
      <Input placeholder="E-mail" />
      <Input
        placeholder="Senha"
        InputRightElement={
          <Icon
            as={<Ionicons name="eye-outline" />}
            size={5}
            mr={3}
            color="gray.500"
          />
        }
      />
      <Button title="Entrar" w="full" bgColor="blue.500" mt={4} />
    </VStack>
  );
}
