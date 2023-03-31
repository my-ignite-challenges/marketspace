import {
  Divider,
  HStack,
  Image,
  Pressable,
  useTheme,
  useToast,
} from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

import { AdProps } from "../@types";
import { Input } from "./Input";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

import FilterIcon from "../assets/filter-icon.png";

type Props = {
  setShowFilter: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  setAds: (value: AdProps[]) => void;
  searchTerm: string;
};

function InputButtons({
  setShowFilter,
  setSearchTerm,
  searchTerm,
  setAds,
}: Props) {
  const { colors } = useTheme();
  const toast = useToast();

  async function handleSearch() {
    try {
      const response = await api.get(`/products?query=${searchTerm}`);
      setSearchTerm("");
      setAds(response.data);
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Nenhum item correspondente à pesquisa foi encontrado.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <HStack alignItems="center" space={3} mr={3}>
      <Pressable _pressed={{ opacity: 0.8 }} onPress={handleSearch}>
        <MagnifyingGlass color={colors.gray[600]} size={20} />
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

export function Search({
  setShowFilter,
  searchTerm,
  setSearchTerm,
  setAds,
}: Props) {
  return (
    <Input
      rightElement={
        <InputButtons
          setShowFilter={setShowFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setAds={setAds}
        />
      }
      placeholder="Buscar anúncio"
      value={searchTerm}
      onChangeText={setSearchTerm}
      mt={3}
      mb={2}
    />
  );
}
