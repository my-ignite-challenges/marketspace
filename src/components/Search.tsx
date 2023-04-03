import {
  Divider,
  HStack,
  Image,
  Pressable,
  Spinner,
  useTheme,
  useToast,
} from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

import { AdProps } from "../@types";
import { Input } from "./Input";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

import FilterIcon from "../assets/filter-icon.png";
import { useState } from "react";

type Props = {
  setShowFilter: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  setAds: (value: AdProps[]) => void;
  searchTerm: string;
};

type InputButtonsProps = Props & {
  handleSearch: () => Promise<void>;
  isSearching: boolean;
};

function InputButtons({
  isSearching,
  setShowFilter,
  handleSearch,
}: InputButtonsProps) {
  const { colors } = useTheme();

  return (
    <HStack alignItems="center" space={3} mr={3}>
      {isSearching ? (
        <Spinner color="blue.500" size="sm" />
      ) : (
        <Pressable _pressed={{ opacity: 0.8 }} onPress={handleSearch}>
          <MagnifyingGlass color={colors.gray[600]} size={20} />
        </Pressable>
      )}
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
  const [isSearching, setIsSearching] = useState(false);

  const toast = useToast();

  async function handleSearch() {
    try {
      setIsSearching(true);
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
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <Input
      mt={3}
      mb={2}
      rightElement={
        <InputButtons
          setShowFilter={setShowFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setAds={setAds}
          handleSearch={handleSearch}
          isSearching={isSearching}
        />
      }
      placeholder="Buscar anúncio"
      value={searchTerm}
      onChangeText={setSearchTerm}
      onSubmitEditing={handleSearch}
    />
  );
}
