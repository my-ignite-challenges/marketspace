import { Divider, HStack, Icon, Image, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";

import { Input } from "./Input";

import FilterIcon from "../assets/filter-icon.png";

type Props = {
  setShowFilter: (value: boolean) => void;
};

function InputButtons({ setShowFilter }: Props) {
  return (
    <HStack alignItems="center" space={3} mr={3}>
      <Pressable _pressed={{ opacity: 0.8 }}>
        <Icon as={Feather} name="search" color="gray.600" size={5} />
      </Pressable>
      <Divider
        flexDirection="column"
        orientation="vertical"
        h="18px"
        bgColor="gray.400"
      />
      <Pressable
        alignItems="center"
        _pressed={{ opacity: 0.8 }}
        onPress={() => setShowFilter(true)}
      >
        <Image source={FilterIcon} alt="Ícone de Filtro" />
      </Pressable>
    </HStack>
  );
}

export function Search({ setShowFilter }: Props) {
  return (
    <Input
      rightElement={<InputButtons setShowFilter={setShowFilter} />}
      placeholder="Buscar anúncio"
      mt={3}
      mb={2}
    />
  );
}
