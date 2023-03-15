import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

import { AdProps } from "../@types";

import adImage from "../assets/ad-image.png";

type Props = {
  data: AdProps;
  index: number;
  showAvatar?: boolean;
};

export function Ad({ data, index, showAvatar = true }: Props) {
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
          {showAvatar && (
            <Avatar
              source={adImage}
              position="absolute"
              top={1}
              left={1}
              size={8}
              borderWidth={1}
              borderColor="gray.100"
            />
          )}
          <Badge
            title={data.isNew ? "Novo" : "Usado"}
            bgColor={data.isNew ? "blue.700" : "gray.600"}
            position="absolute"
            top={1}
            right={1}
          />
          {data.isInactive && (
            <>
              <Text
                color="gray.100"
                fontFamily="heading"
                fontSize="11px"
                position="absolute"
                bottom={1}
                left={1}
                zIndex={2}
              >
                ANÚNCIO DESATIVADO
              </Text>
              <Box
                w="full"
                h="100px"
                bgColor="rgba(0, 0, 0, 0.4)"
                rounded="md"
                position="absolute"
                top={0}
                left={0}
                zIndex={1}
              />
            </>
          )}
        </Box>
        <VStack w="full" mt={1}>
          <Text color={data.isInactive ? "gray.400" : "gray.600"}>
            Tênis Vermelho
          </Text>
          <HStack alignItems="center" space={1}>
            <Text
              color={data.isInactive ? "gray.400" : "gray.700"}
              fontSize="xs"
              fontFamily={data.isInactive ? "body" : "heading"}
            >
              R$
            </Text>
            <Text
              color={data.isInactive ? "gray.400" : "gray.700"}
              fontSize="md"
              fontFamily={data.isInactive ? "body" : "heading"}
            >
              59,90
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
