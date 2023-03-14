import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

import { Avatar } from "./Avatar";

import adImage from "../assets/ad-image.png";

import { AdProps } from "../@types";
import { Badge } from "./Badge";

type Props = {
  data: AdProps;
  index: number;
};

export function Ad({ data, index }: Props) {
  return (
    <Pressable
      _pressed={{
        opacity: 0.8,
      }}
      w="50%"
      mb={6}
      borderRightWidth={index % 2 === 0 ? 20 : 0}
      borderRightColor={index % 2 === 0 ? "gray.200" : "none"}
      overflow="hidden"
    >
      <VStack>
        <Box w="full" position="relative" rounded="md">
          <Image
            source={data.image}
            alt="Imagem do Produto"
            w="full"
            h="100px"
            resizeMode="contain"
            rounded="md"
          />
          <Avatar
            source={adImage}
            position="absolute"
            top={1}
            left={1}
            size={8}
            borderWidth={1}
            borderColor="gray.100"
          />
          <Badge
            title={data.isNew ? "Novo" : "Usado"}
            bgColor={data.isNew ? "blue.700" : "gray.600"}
            position="absolute"
            top={1}
            right={1}
          />
        </Box>
        <VStack w="full" mt={1}>
          <Text color="gray.600">Tênis Vermelho</Text>
          <HStack alignItems="center" space={1}>
            <Text color="gray.700" fontSize="xs" fontFamily="heading">
              R$
            </Text>
            <Text color="gray.700" fontSize="md" fontFamily="heading">
              59,90
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
