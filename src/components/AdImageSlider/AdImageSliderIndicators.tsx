import { Box, HStack } from "native-base";

import { ProductImage } from "../../@types";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

type Props = IHStackProps & {
  images: ProductImage[];
  currentImageIndex: number;
};

export function AdImageSliderIndicators({
  images,
  currentImageIndex,
  ...props
}: Props) {
  return (
    <HStack
      position="absolute"
      bottom={1}
      left={1}
      space={1}
      justifyContent="center"
      w="full"
      {...props}
    >
      {images?.map((_, index) => (
        <Box
          bgColor="gray.100"
          w="121px"
          h="3px"
          opacity={index === currentImageIndex ? 1 : 0.65}
          key={index}
          borderRadius="999px"
        />
      ))}
    </HStack>
  );
}
