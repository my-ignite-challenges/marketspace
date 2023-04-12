import { useEffect, useState } from "react";

import { Linking } from "react-native";

import { useRoute } from "@react-navigation/native";
import {
  Box,
  Button as NativeBaseButton,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
  useToast,
} from "native-base";
import { ArrowLeft } from "phosphor-react-native";

import { AdDetailsBody } from "../components/AdDetailsBody";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

import { AdProps } from "../@types";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";

import whatsappIcon from "../assets/whatsapp-icon.png";

type RouteParams = {
  adId: string;
};

export function AdDetails() {
  const [ad, setAd] = useState<AdProps>({} as AdProps);
  const [adDataIsLoading, setAdDataIsLoading] = useState(false);

  const { params } = useRoute();
  const { colors } = useTheme();
  const toast = useToast();

  const { adId } = params as RouteParams;

  async function fetchAdDetails() {
    try {
      setAdDataIsLoading(true);
      const response = await api.get(`/products/${adId}`);
      setAd(response.data);
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
      setAdDataIsLoading(false);
    }
  }

  async function handleOpenWhatsappConversationWithAdOwner() {
    await Linking.openURL(`https://wa.me/55${ad.user.tel}`);
  }

  useEffect(() => {
    fetchAdDetails();
  }, []);

  if (adDataIsLoading) {
    return <Loading />;
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Box mt={16} px={6}>
        <Header
          leftIcon={<ArrowLeft size={24} color={colors.gray[700]} />}
          mt={0}
          mb={3}
        />
      </Box>
      <AdDetailsBody data={ad} />
      <HStack
        w="full"
        h="90px"
        bgColor="gray.100"
        px={6}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack alignItems="center" space={1}>
          <Text color="blue.700" fontFamily="heading">
            R$
          </Text>
          <Text color="blue.700" fontSize="2xl" fontFamily="heading">
            {ad?.price}
          </Text>
        </HStack>

        <NativeBaseButton
          bgColor="blue.500"
          onPress={handleOpenWhatsappConversationWithAdOwner}
        >
          <HStack alignItems="center" space={2} borderRadius="6px">
            <Image source={whatsappIcon} alt="Ícone do whatsapp" />
            <Text color="gray.100" fontFamily="heading">
              Entrar em Contato
            </Text>
          </HStack>
        </NativeBaseButton>
      </HStack>
    </VStack>
  );
}
