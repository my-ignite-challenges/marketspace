import { Box, Divider, HStack, Icon, Image, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";

import FilterIcon from "../assets/filter-icon.png";

import { Input } from "./Input";

function InputButtons() {
  return (
    <HStack alignItems="center" space={3} mr={3}>
      <Pressable>
        <Icon as={Feather} name="search" color="gray.600" size={5} />
      </Pressable>
      <Divider
        flexDirection="column"
        orientation="vertical"
        h="18px"
        bgColor="gray.400"
      />
      <Pressable alignItems="center">
        <Image source={FilterIcon} alt="Ícone de Filtro" />
      </Pressable>
    </HStack>
  );
}

export function Search() {
  return (
    <Input
      rightElement={<InputButtons />}
      placeholder="Buscar anúncio"
      mt={3}
      mb={6}
    />
  );
}
