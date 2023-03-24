import { useState } from "react";

import { Divider, HStack, Icon, Image, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";

import { Input } from "./Input";
import { Filter } from "./Filter";

import FilterIcon from "../assets/filter-icon.png";

function InputButtons() {
  const [showModal, setShowModal] = useState(false);

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
      <Pressable alignItems="center" onPress={() => setShowModal(true)}>
        <Image source={FilterIcon} alt="Ícone de Filtro" />
      </Pressable>

      {showModal && (
        <Filter showModal={showModal} setShowModal={setShowModal} />
      )}
    </HStack>
  );
}

export function Search() {
  return (
    <Input
      rightElement={<InputButtons />}
      placeholder="Buscar anúncio"
      mt={3}
      mb={2}
    />
  );
}
