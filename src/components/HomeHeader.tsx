import { HStack, Icon, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

import DefaultAvatar from "../assets/default-avatar.png";

export function HomeHeader() {
  return (
    <HStack w="full" h="45px" mt={16}>
      <Avatar source={DefaultAvatar} size={12} />
      <HStack flex={1} justifyContent="space-between">
        <VStack ml="10px">
          <Text color="gray.700" fontSize="md">
            Boas vindas,
          </Text>
          <Text color="gray.700" fontSize="md" fontFamily="heading">
            Fulano!
          </Text>
        </VStack>
        <Button
          title="Criar anúncio"
          bgColor="gray.700"
          leftIcon={<Icon as={Feather} name="plus" color="gray.200" />}
          textColor="gray.100"
        />
      </HStack>
    </HStack>
  );
}
