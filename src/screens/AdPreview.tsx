import { useState } from "react";
import { Dimensions } from "react-native";

import {
  Box,
  Button as NativeBaseButton,
  HStack,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

import { AdDescription } from "../components/AdDescription";
import { AdPreviewImageSliderIndicators } from "../components/AdPreview/AdPreviewImageSliderIndicators";

import { ads } from "../utils";

export function AdPreview() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { colors } = useTheme();

  const width = Dimensions.get("screen").width;
  const images = ads.map((ad) => ad.image).slice(0, 3);

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
        <GestureHandlerRootView>
          <Carousel
            width={width}
            height={280}
            data={images}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setCurrentImageIndex(index)}
            renderItem={({ item }) => (
              <Box position="relative" h="full">
                <Image
                  w={width}
                  source={item}
                  flex={1}
                  resizeMode="cover"
                  alt="Imagem do anúncio"
                />
                <AdPreviewImageSliderIndicators
                  numberOfImages={images.length}
                  position="absolute"
                  bottom={1}
                  left={1}
                  currentImageIndex={currentImageIndex}
                />
              </Box>
            )}
          />
        </GestureHandlerRootView>

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
        <NativeBaseButton bgColor="blue.500" w="48%">
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
