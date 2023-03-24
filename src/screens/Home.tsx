import { useEffect, useState } from "react";

import { Text, useToast, VStack } from "native-base";

import { ActiveAdsReport } from "../components/ActiveAdsReport";
import { AdList } from "../components/AdList";
import { HomeHeader } from "../components/HomeHeader";
import { Search } from "../components/Search";

import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

export function Home() {
  const [ads, setAds] = useState<AdProps[]>([]);

  const toast = useToast();

  async function fetchLoggedUserAds() {
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
    fetchLoggedUserAds();
  }, []);

  return (
    <VStack flex={1} px={6} bgColor="gray.200">
      <HomeHeader />
      {ads.length > 0 && <ActiveAdsReport data={ads} />}
      <VStack>
        <Text color="gray.500">Compre produtos variados</Text>
        <Search />
      </VStack>
      <AdList />
    </VStack>
  );
}
