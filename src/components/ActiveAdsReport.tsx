import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Icon, Image, Pressable, Text, VStack } from "native-base";

import TagImage from "../assets/tag.png";
import { AppBottomTabNavigatorRoutes } from "../routes/app.routes";

export function ActiveAddsReport() {
  const { navigate } = useNavigation<AppBottomTabNavigatorRoutes>();

  return (
    <VStack w="full" h={24} my={8}>
      <Text color="gray.500">Seus produtos anunciados para venda</Text>
      <Box
        w="full"
        h="66px"
        bgColor="rgba(100, 122, 199, 0.1)"
        mt={3}
        alignItems="center"
        flexDirection="row"
        borderRadius="6px"
        py={3}
        pl={4}
        pr={5}
      >
        <Image source={TagImage} alt="Imagem de Etiqueta" w="22px" h="22px" />
        <VStack ml={4}>
          <Text color="gray.600" fontSize="xl" fontFamily="heading">
            4
          </Text>
          <Text color="gray.600" fontSize="xs">
            anúncios ativos
          </Text>
        </VStack>

        <Pressable
          ml="auto"
          _pressed={{ opacity: 0.8 }}
          onPress={() => navigate("MyAds")}
        >
          <HStack space={2} alignItems="center">
            <Text color="blue.700" fontSize="xs" fontFamily="heading">
              Meus anúncios
            </Text>
            <Icon as={Feather} name="arrow-right" color="blue.700" size={4} />
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
}
