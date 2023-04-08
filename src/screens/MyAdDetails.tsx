import { useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme, useToast, VStack } from "native-base";
import {
  ArrowLeft,
  PencilSimpleLine,
  Power,
  TrashSimple,
} from "phosphor-react-native";

import { AdDetailsBody } from "../components/AdDetailsBody";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { AdProps } from "../@types";
import { Loading } from "../components/Loading";
import { AppStackNavigatorRoutes } from "../routes/app.routes";

type RouteParams = {
  adId: string;
};

export function MyAdDetails() {
  const [adDataisLoading, setAdDataIsLoading] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [ad, setAd] = useState<AdProps>({} as AdProps);

  const { navigate } = useNavigation<AppStackNavigatorRoutes>();
  const { params } = useRoute();
  const { adId } = params as RouteParams;
  const { colors } = useTheme();
  const toast = useToast();

  async function fetchMyAdDetails() {
    try {
      setAdDataIsLoading(true);
      const response = await api.get(`/products/${adId}`);
      setAd(response.data);
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível carregar os dados do anúncio",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setAdDataIsLoading(false);
    }
  }

  async function handleMarkAdAsActiveOrInactive() {
    try {
      setIsDeactivating(true);
      await api.patch(`/products/${ad.id}`, {
        is_active: !ad.is_active,
      });

      toast.show({
        title: "Anúncio desativado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      navigate("HomeTabs");
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível desativar o anúncio. Tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsDeactivating(false);
    }
  }

  useEffect(() => {
    fetchMyAdDetails();
  }, []);

  if (adDataisLoading) {
    return <Loading />;
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Header
        leftIcon={<ArrowLeft size={24} color={colors.gray[700]} />}
        rightIcon={<PencilSimpleLine size={24} color={colors.gray[700]} />}
        px={6}
        mb={3}
        onRightIconPress={() => navigate("EditAd", { adId: ad.id })}
      />

      <AdDetailsBody data={ad} />
      <VStack space={2} px={6} mt={4} mb={6}>
        <Button
          title={ad.is_active ? "Desativar anúncio" : "Reativar anúncio"}
          icon={<Power color={colors.gray[200]} size={16} />}
          bgColor={ad.is_active ? "gray.700" : "blue.500"}
          isLoading={isDeactivating}
          onPress={handleMarkAdAsActiveOrInactive}
        />
        <Button
          title="Excluir anúncio"
          icon={<TrashSimple color={colors.gray[600]} size={16} />}
          bgColor="gray.300"
          textColor="gray.600"
          isLoading={isRemoving}
          onPress={handleMarkAdAsActiveOrInactive}
        />
      </VStack>
    </VStack>
  );
}
