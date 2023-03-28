import { useRoute } from "@react-navigation/native";
import {
  Button as NativeBaseButton,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";

import { AdDescription } from "../components/AdDescription";
import { AdImageSlider } from "../components/AdImageSlider/AdImageSlider";

import { event } from "../utils/event";

type RouteParams = {
  eventName: string;
  isPublishing: boolean;
};

export function AdPreview() {
  const { colors } = useTheme();

  const { params } = useRoute();
  const { eventName, isPublishing } = params as RouteParams;

  return (
    <VStack bgColor="gray.200" flex={1}>
      <VStack
        bg="blue.500"
        w="full"
        h="121px"
        justifyContent="center"
        alignItems="center"
        px={6}
      >
        <VStack mt={12}>
          <Text
            color="gray.100"
            fontFamily="heading"
            fontSize="md"
            textAlign="center"
          >
            Pré visualização do anúncio
          </Text>
          <Text color="gray.100">É assim que seu produto vai aparecer!</Text>
        </VStack>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <AdImageSlider />
        <AdDescription />
      </ScrollView>

      <HStack
        w="full"
        h="90px"
        bgColor="gray.100"
        alignItems="center"
        justifyContent="space-between"
        px={6}
      >
        <NativeBaseButton bgColor="gray.300" w="48%">
          <HStack alignItems="center" space={2} borderRadius="6px" py="3px">
            <ArrowLeft size={16} color={colors.gray[600]} />
            <Text color="gray.700" fontFamily="heading">
              Voltar e editar
            </Text>
          </HStack>
        </NativeBaseButton>
        <NativeBaseButton
          bgColor="blue.500"
          w="48%"
          isLoading={isPublishing}
          onPress={() => event.emit(eventName)}
        >
          <HStack alignItems="center" space={2} borderRadius="6px" py="3px">
            <Tag size={16} color={colors.gray[200]} />
            <Text color="gray.100" fontFamily="heading">
              Publicar
            </Text>
          </HStack>
        </NativeBaseButton>
      </HStack>
    </VStack>
  );
}
