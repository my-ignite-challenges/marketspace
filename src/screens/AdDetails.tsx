import {
  Box,
  Button as NativeBaseButton,
  HStack,
  Image,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft } from "phosphor-react-native";

import { AdDetailsBody } from "../components/AdDetailsBody";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { Header } from "../components/Header";

import { paymentMethods } from "../utils";

import whatsappIcon from "../assets/whatsapp-icon.png";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  adId: string;
};

export function AdDetails() {
  const { colors } = useTheme();

  const { params } = useRoute();

  const { adId } = params as RouteParams;

  const adBelongsToLoggedUser = false;

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Box mt={16} px={6}>
        <Header
          leftIcon={<ArrowLeft size={24} color={colors.gray[700]} />}
          mt={0}
          mb={3}
        />
      </Box>
      <AdDetailsBody />
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
            59,90
          </Text>
        </HStack>

        <NativeBaseButton bgColor="blue.500">
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
