import { useEffect, useState } from "react";

import { FlatList, useToast, VStack } from "native-base";

import { api } from "../services/api";
import { Ad } from "./Ad";
import { AppError } from "../utils/AppError";
import { AdProps } from "../@types";

export function AdList() {
  const [ads, setAds] = useState<AdProps[]>([]);

  const toast = useToast();

  async function fetchAds() {
    try {
      const response = await api.get("/products");

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
    fetchAds();
  }, []);

  return (
    <VStack flex={1}>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Ad data={item} index={index} mr={index % 2 === 0 ? 5 : 0} mb={6} />
        )}
        numColumns={ads.length > 1 ? 2 : 1}
        _contentContainerStyle={
          ads.length > 1
            ? {
                alignItems: "center",
                paddingBottom: 10,
              }
            : {}
        }
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
