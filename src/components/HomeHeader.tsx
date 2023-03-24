import { HStack, Icon, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

import DefaultAvatar from "../assets/default-avatar.png";
import { useNavigation } from "@react-navigation/native";
import { AppStackNavigatorRoutes } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export function HomeHeader() {
  const { navigate } = useNavigation<AppStackNavigatorRoutes>();
  const { user } = useAuth();

  return (
    <HStack w="full" h="45px" mt={16}>
      <Avatar
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
            : DefaultAvatar
        }
        size={12}
      />
      <HStack flex={1} justifyContent="space-between">
        <VStack ml="10px">
          <Text color="gray.700" fontSize="md">
            Boas vindas,
          </Text>
          <Text color="gray.700" fontSize="md" fontFamily="heading">
            Fulano!
          </Text>
        </VStack>
        <Button
          title="Criar anúncio"
          bgColor="gray.700"
          leftIcon={<Icon as={Feather} name="plus" color="gray.200" />}
          textColor="gray.100"
          onPress={() => navigate("CreateAd")}
        />
      </HStack>
    </HStack>
  );
}
