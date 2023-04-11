import { useCallback, useState } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
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

import { Ad } from "../components/Ad";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

import { AppStackNavigatorRoutes } from "../routes/app.routes";
import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { MyAdsFilters } from "../utils";

export function MyAds() {
  const [selectedAdFilter, setSelectedAdFilter] = useState("all");
  const [ads, setAds] = useState<AdProps[]>([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const { navigate } = useNavigation<AppStackNavigatorRoutes>();
  const { colors } = useTheme();

  const toast = useToast();

  const numberOfColumns = ads.length > 1 ? 2 : 1;

  async function fetchMyAds() {
    try {
      setDataIsLoading(true);
      const response = await api.get("/users/products");

      const adsWithNewProducts = response.data.filter(
        (item: AdProps) => item.is_new
      );

      const adsWithUsedProducts = response.data.filter(
        (item: AdProps) => !item.is_new
      );

      if (selectedAdFilter === "all") {
        setAds(response.data);
      } else {
        setAds(
          selectedAdFilter === "new" ? adsWithNewProducts : adsWithUsedProducts
        );
      }
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível carregar os dados dos anúncios",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setDataIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds();
    }, [selectedAdFilter])
  );

  return (
    <VStack bgColor="gray.200" flex={1} px={6}>
      <Header
        title="Meus anúncios"
        rightIcon={<Plus color={colors.gray[700]} size={24} />}
        onRightIconPress={() => navigate("CreateAd")}
      />

      <HStack alignItems="center" justifyContent="space-between" mb={5}>
        <Text color="gray.600">
          {ads.length} {ads.length === 1 ? "anúncio" : "anúncios"}
        </Text>
        <Select
          w={24}
          h="34px"
          accessibilityLabel="Selecione uma opção"
          placeholder="Selecionar"
          _selectedItem={{
            bg: "blue.500",
            _text: {
              color: "gray.100",
            },
          }}
          dropdownIcon={<CaretDown size={16} style={{ marginRight: 10 }} />}
          selectedValue={selectedAdFilter}
          onValueChange={(itemValue: string) => {
            setSelectedAdFilter(itemValue);
          }}
          color="gray.700"
        >
          {MyAdsFilters.map((option) => (
            <Select.Item
              key={option.key}
              label={option.name}
              value={option.key}
            />
          ))}
        </Select>
      </HStack>

      {dataIsLoading ? (
        <Loading />
      ) : (
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
              Nenhum anúncio encontrado.
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
