import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  HStack,
  Select,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";

import { Header } from "../components/Header";
import { Ad } from "../components/Ad";

import { AppStackNavigatorRoutes } from "../routes/app.routes";
import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

export function MyAds() {
  const [selectedAdFilter, setSelectedAdFilter] = useState("todos");
  const [ads, setAds] = useState<AdProps[]>([]);

  const { navigate } = useNavigation<AppStackNavigatorRoutes>();
  const { colors } = useTheme();

  const toast = useToast();

  const numberOfColumns = ads.length > 1 ? 2 : 1;

  async function fetchMyAds() {
    try {
      const response = await api.get("/users/products");

      setAds(response.data);
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível carregar os dados dos anúncios",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchMyAds();
  }, []);

  return (
    <VStack bgColor="gray.200" flex={1} px={6}>
      <Header
        title="Meus anúncios"
        rightIcon={<Plus color={colors.gray[700]} size={24} />}
        onRightIconPress={() => navigate("CreateAd")}
      />

      <HStack alignItems="center" justifyContent="space-between" mb={5}>
        <Text color="gray.600">
          {ads.length} {ads.length > 1 ? "anúncios" : "anúncio"}
        </Text>
        <Select
          w={20}
          h={8}
          accessibilityLabel="Selecione uma opção"
          placeholder="Selecionar"
          _selectedItem={{
            bg: "blue.500",
            _text: {
              color: "gray.100",
            },
          }}
          dropdownIcon={<CaretDown size={16} style={{ marginRight: 4 }} />}
          selectedValue={selectedAdFilter}
          onValueChange={(itemValue: string) => {
            setSelectedAdFilter(itemValue);
          }}
          color="gray.700"
        >
          <Select.Item label="Todos" value="todos" />
          <Select.Item label="Usados" value="usado" />
          <Select.Item label="Novos" value="novo" />
        </Select>
      </HStack>

      <FlatList
        key={numberOfColumns}
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Ad
            data={item}
            index={index}
            showAvatar={false}
            mr={index < ads.length - 1 ? 5 : 0}
          />
        )}
        numColumns={numberOfColumns}
        _contentContainerStyle={{
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text color="gray.600" textAlign="center" fontFamily="heading">
            Você ainda não publicou anúncios.
          </Text>
        )}
      />
    </VStack>
  );
}
