import { useState } from "react";

import { Dimensions } from "react-native";

import { Box, Image, Text } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

import { AdProps } from "../../@types";
import { AdImageSliderIndicators } from "./AdImageSliderIndicators";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  data: AdProps;
};

export function AdImageSlider({ data }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const width = Dimensions.get("screen").width;

  const { user } = useAuth();

  const isAdActive = user.id === data?.user_id ? data?.is_active : true;

  return (
    <GestureHandlerRootView style={{ position: "relative" }}>
      {data.product_images?.length > 1 ? (
        <Carousel
          width={width}
          height={280}
          data={data?.product_images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => setCurrentImageIndex(index)}
          renderItem={({ item }) => (
            <Box position="relative" h="full">
              <Image
                w={width}
                source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                flex={1}
                resizeMode="cover"
                alt="Imagem do anúncio"
              />
              <AdImageSliderIndicators
                images={data?.product_images}
                position="absolute"
                bottom={1}
                left={1}
                currentImageIndex={currentImageIndex}
              />
            </Box>
          )}
        />
      ) : (
        <Box position="relative" height="280px">
          <Image
            w={width}
            source={{
              uri:
                data?.product_images &&
                `${api.defaults.baseURL}/images/${data?.product_images[0]?.path}`,
            }}
            flex={1}
            resizeMode="cover"
            alt="Imagem do anúncio"
          />
        </Box>
      )}

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
