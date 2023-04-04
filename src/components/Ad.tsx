import { useNavigation } from "@react-navigation/native";
import {
  Box,
  HStack,
  Image,
  IPressableProps,
  Pressable,
  Text,
  VStack,
} from "native-base";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

import { AdProps } from "../@types";
import { AppStackNavigatorRoutes } from "../routes/app.routes";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import adImage from "../assets/bike.png";

import { Dimensions } from "react-native";

type Props = IPressableProps & {
  data: AdProps;
  index: number;
  showAvatar?: boolean;
};

export function Ad({ data, index, showAvatar = true, ...props }: Props) {
  const { navigate } = useNavigation<AppStackNavigatorRoutes>();

  const { user } = useAuth();

  const adIsActive = data?.user?.id === user.id ? data.is_active : true;

  const width = Dimensions.get("screen").width;

  function navigateToAdDetails() {
    navigate(`${data?.user?.id === user.id ? "MyAdDetails" : "AdDetails"}`, {
      adId: data.id,
    });
  }

  return (
    <Pressable
      _pressed={{
        opacity: 0.8,
      }}
      w={width / 2 - 34}
      overflow="hidden"
      onPress={navigateToAdDetails}
      {...props}
    >
      <VStack>
        <Box w="full" position="relative" rounded="md">
          <Image
            source={
              data.product_images?.length
                ? {
                    uri: `${api.defaults.baseURL}/images/${data.product_images[0]?.path}`,
                  }
                : adImage
            }
            alt="Imagem do Produto"
            w="full"
            h="100px"
            resizeMode="contain"
            rounded="md"
          />
          {showAvatar && (
            <Avatar
              source={{
                uri: `${api.defaults.baseURL}/images/${data?.user?.avatar}`,
              }}
              position="absolute"
              top={1}
              left={1}
              size={8}
              borderWidth={1}
              borderColor="gray.100"
            />
          )}
          <Badge
            title={data.is_new ? "Novo" : "Usado"}
            bgColor={data.is_new ? "blue.700" : "gray.600"}
            position="absolute"
            top={1}
            right={1}
          />
          {!adIsActive && (
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
          <Text color={adIsActive ? "gray.600" : "gray.400"}>{data.name}</Text>
          <HStack alignItems="center" space={1}>
            <Text
              color={adIsActive ? "gray.700" : "gray.400"}
              fontSize="xs"
              fontFamily={adIsActive ? "heading" : "body"}
            >
              R$
            </Text>
            <Text
              color={adIsActive ? "gray.700" : "gray.400"}
              fontSize="md"
              fontFamily={adIsActive ? "heading" : "body"}
            >
              {data.price}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
