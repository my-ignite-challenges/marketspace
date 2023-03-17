import { useState } from "react";

import { Dimensions } from "react-native";

import { Box, Image, Text } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

import { AdImageSliderIndicators } from "./AdImageSliderIndicators";
import { ads } from "../../utils";

export function AdImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const width = Dimensions.get("screen").width;
  const images = ads.map((ad) => ad.image).slice(0, 3);

  const isAdActive = true;

  return (
    <GestureHandlerRootView style={{ position: "relative" }}>
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
            <AdImageSliderIndicators
              numberOfImages={images.length}
              position="absolute"
              bottom={1}
              left={1}
              currentImageIndex={currentImageIndex}
            />
          </Box>
        )}
      />

      {!isAdActive && (
        <Box
          width={width}
          height={280}
          position="absolute"
          top={0}
          left={0}
          bgColor="rgba(0,0,0,0.5)"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.100" fontFamily="heading">
            ANÚNCIO DESATIVADO
          </Text>
        </Box>
      )}
    </GestureHandlerRootView>
  );
}
