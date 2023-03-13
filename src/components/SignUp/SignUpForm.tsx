import { Box, Icon, Image, Pressable, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Input } from "../Input";

import DefaultAvatar from "../../assets/default-avatar.png";
import Pencil from "../../assets/pencil.png";

export function SignUpForm() {
  return (
    <VStack space={4} alignItems="center" w="full">
      <Box position="relative">
        <Avatar size={24} mt={8} source={DefaultAvatar} />
        <Pressable
          bgColor={"blue.500"}
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          rounded="full"
          position="absolute"
          bottom={0}
          right={-4}
        >
          <Image source={Pencil} alt="Ícone de edição" />
        </Pressable>
      </Box>
      <Input placeholder="Nome" />
      <Input placeholder="E-mail" />
      <Input placeholder="Telefone" />
      <Input
        placeholder="Senha"
        InputRightElement={
          <Icon
            as={<Ionicons name="eye-outline" />}
            size={5}
            mr="2"
            color="gray.500"
          />
        }
      />
      <Input
        placeholder="Confirmar Senha"
        InputRightElement={
          <Icon
            as={<Ionicons name="eye-outline" />}
            size={5}
            mr="2"
            color="gray.500"
          />
        }
      />
      <Button title="Criar" w="full" bgColor="gray.700" mt={4} />
    </VStack>
  );
}
