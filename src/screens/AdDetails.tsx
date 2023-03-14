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

import adImage from "../assets/bike.png";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { paymentMethods } from "../utils";

import WhatsappIcon from "../assets/whatsapp-icon.png";

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
        <VStack px={6}>
          <HStack space={2} alignItems="center" mt={5}>
            <Avatar source={adImage} size={8} />
            <Text color="gray.700">Makenna Baptista</Text>
          </HStack>

          <VStack mt={7} space={2}>
            <Badge title="Novo" bgColor="gray.300" textColor="gray.600" />
            <HStack justifyContent="space-between">
              <Text color="gray.700" fontSize="xl" fontFamily="heading">
                Bicicleta
              </Text>
              <HStack alignItems="center" space={1}>
                <Text color="blue.500" fontFamily="heading">
                  R$
                </Text>
                <Text color="blue.500" fontSize="xl" fontFamily="heading">
                  59,90
                </Text>
              </HStack>
            </HStack>

            <Text color="gray.600">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>
          </VStack>

          <VStack>
            <HStack space={2} mt={6} mb={4}>
              <Text color="gray.600" fontFamily="heading">
                Aceita troca?
              </Text>
              <Text color="gray.600">Sim</Text>
            </HStack>

            <VStack>
              <Text color="gray.600" fontFamily="heading">
                Meios de pagamento
              </Text>

              <VStack mt={2} mb={6} space={2}>
                {paymentMethods.map((method) => (
                  <HStack key={method.id} alignItems="center" space={2}>
                    <method.icon size={18} color={colors.gray[700]} />
                    <Text color="gray.600">{method.label}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>

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
