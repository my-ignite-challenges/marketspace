import { useEffect, useState } from "react";

import { Text, useToast, VStack } from "native-base";

import { ActiveAdsReport } from "../components/ActiveAdsReport";
import { AdList } from "../components/AdList";
import { HomeHeader } from "../components/HomeHeader";
import { Search } from "../components/Search";

import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { Filter } from "../components/Filter";
import { useAuth } from "../hooks/useAuth";

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

  const toast = useToast();

  const hasFilters = Object.keys(filters).length > 0;

  const { signOut } = useAuth();

  async function fetchLoggedUserAds() {
    try {
      const response = await api.get("/users/products");

      console.log("myads", response.data);

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
    }
  }

  async function fetchAds() {
    try {
      const paymentMethodQueryString = filters?.payment_methods?.map(
        (method) => `&payment_methods=${method}`
      );
      console.log(filters?.is_new);

      const filterString = `?is_new=${filters?.is_new === "new"}&accept_trade=${
        filters?.accept_trade
      }${paymentMethodQueryString}`;

      const response = await api.get(
        `/products${hasFilters ? filterString : ""}`
      );

      setAds(response.data);
      console.log("request", response.request);
      console.log("ads", response.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchLoggedUserAds();
    // signOut();
  }, []);

  useEffect(() => {
    fetchAds();
  }, [filters]);

  console.log("filters", filters);

  return (
    <>
      <VStack flex={1} px={6} bgColor="gray.200">
        <HomeHeader />
        {loggedUserAds.length > 0 && <ActiveAdsReport data={loggedUserAds} />}
        <VStack>
          <Text color="gray.500">Compre produtos variados</Text>
          <Search setShowFilter={setShowFilter} />
        </VStack>
        <AdList data={ads} />
      </VStack>
      {showFilter && (
        <Filter setShowFilter={setShowFilter} setFilters={setFilters} />
      )}
    </>
  );
}
