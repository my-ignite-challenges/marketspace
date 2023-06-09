import { useCallback, useState } from "react";

import { ScrollView, Text, useToast, VStack } from "native-base";

import { ActiveAdsReport } from "../components/ActiveAdsReport";
import { AdList } from "../components/AdList";
import { HomeHeader } from "../components/HomeHeader";
import { Search } from "../components/Search";

import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { Filter } from "../components/Filter";
import { Loading } from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

export type Filters = {
  is_new?: string;
  accept_trade?: boolean;
  payment_methods: string[];
};

export function Home() {
  const [loggedUserAds, setLoggedUserAds] = useState<AdProps[]>([]);
  const [ads, setAds] = useState<AdProps[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [adListIsLoading, setAdListIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toast = useToast();

  const hasFilters = Object.keys(filters).length > 0;

  async function fetchLoggedUserAds() {
    try {
      setAdListIsLoading(true);
      const response = await api.get("/users/products");

      setLoggedUserAds(response.data);
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
      setAdListIsLoading(false);
    }
  }

  async function fetchAds() {
    try {
      const paymentMethodQueryString = filters?.payment_methods?.map(
        (method) => `&payment_methods=${method}`
      );

      const filterString = `?is_new=${filters?.is_new === "new"}&accept_trade=${
        filters?.accept_trade
      }${paymentMethodQueryString}`;

      const response = await api.get(
        `/products${hasFilters ? filterString : ""}`
      );

      setAds(response.data);
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível carregar os dados dos anúncios ou filtrar pelos argumentos informados.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchLoggedUserAds();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (hasFilters) {
        setFilters({} as Filters);
      }
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [filters])
  );

  return (
    <>
      <VStack bgColor="gray.200">
        <ScrollView px={6}>
          <VStack flex={1}>
            <HomeHeader />
            {loggedUserAds.length > 0 && (
              <ActiveAdsReport data={loggedUserAds} />
            )}
            <VStack mt={!ads.length || !loggedUserAds.length ? 8 : 0}>
              <Text color="gray.500">Compre produtos variados</Text>
              <Search
                setShowFilter={setShowFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setAds={setAds}
              />
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
      <VStack flex={1} px={6}>
        {adListIsLoading ? <Loading /> : <AdList data={ads} />}
      </VStack>
      {showFilter && (
        <Filter setShowFilter={setShowFilter} setFilters={setFilters} />
      )}
    </>
  );
}
