import { Box, HStack, Text } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

type Props = IHStackProps & {
  numberOfImages: number;
  currentImageIndex: number;
};

export function AdImageSliderIndicators({
  numberOfImages,
  currentImageIndex,
  ...props
}: Props) {
  const images = Array(numberOfImages).fill("");

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
      {images.map((image, index) => (
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
