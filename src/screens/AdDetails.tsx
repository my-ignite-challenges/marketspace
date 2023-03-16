import {
  Box,
  Button as NativeButton,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { paymentMethods } from "../utils";

import adImage from "../assets/bike.png";
import WhatsappIcon from "../assets/whatsapp-icon.png";
import { AdDescription } from "../components/AdDescription";

export function AdDetails() {
  const { colors } = useTheme();
  return (
    <VStack bgColor="gray.200" flex={1}>
      <Box mt={16} px={6}>
        <Pressable>
          <Icon as={Feather} name="arrow-left" color="gray.700" size={6} />
        </Pressable>
      </Box>
      <Image
        source={adImage}
        alt="Imagem do anúncio"
        resizeMode="cover"
        mt={3}
        w="full"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdDescription />

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

          <NativeButton bgColor="blue.500">
            <HStack alignItems="center" space={2} borderRadius="6px">
              <Image source={WhatsappIcon} alt="Ícone do whatsapp" />
              <Text color="gray.100" fontFamily="heading">
                Entrar em Contato
              </Text>
            </HStack>
          </NativeButton>
        </HStack>
      </ScrollView>
    </VStack>
  );
}
