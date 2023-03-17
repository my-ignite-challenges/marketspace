import { useTheme, VStack } from "native-base";
import {
  ArrowLeft,
  PencilSimpleLine,
  Power,
  TrashSimple,
} from "phosphor-react-native";

import { AdDetailsBody } from "../components/AdDetailsBody";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function MyAdDetails() {
  const { colors } = useTheme();

  const isAdActive = true;
  return (
    <VStack bgColor="gray.200" flex={1}>
      <Header
        leftIcon={<ArrowLeft size={24} color={colors.gray[700]} />}
        rightIcon={<PencilSimpleLine size={24} color={colors.gray[700]} />}
        px={6}
        mb={3}
      />

      <AdDetailsBody />
      <VStack space={2} px={6} mt={4} mb={6}>
        <Button
          title={isAdActive ? "Desativar anúncio" : "Reativar anúncio"}
          icon={<Power color={colors.gray[200]} size={16} />}
          bgColor={isAdActive ? "gray.700" : "blue.500"}
        />
        <Button
          title="Excluir anúncio"
          icon={<TrashSimple color={colors.gray[600]} size={16} />}
          bgColor="gray.300"
          textColor="gray.600"
        />
      </VStack>
    </VStack>
  );
}
