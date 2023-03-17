import { HStack, Text, useTheme, VStack } from "native-base";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { paymentMethods } from "../utils";

import adImage from "../assets/bike.png";

export function AdDescription() {
  const { colors } = useTheme();
  return (
    <VStack px={6}>
      <HStack space={2} alignItems="center" mt={5}>
        <Avatar source={adImage} size={8} borderWidth="2px" />
        <Text color="gray.700">Makenna Baptista</Text>
      </HStack>

      <VStack mt={7} space={2}>
        <Badge title="Novo" bgColor="gray.300" textColor="gray.600" />
        <HStack justifyContent="space-between">
          <Text color="gray.700" fontSize="xl" fontFamily="heading">
            Bicicleta
          </Text>
          <HStack alignItems="center" space={1}>
            <Text color="blue.500" fontFamily="heading">
              R$
            </Text>
            <Text color="blue.500" fontSize="xl" fontFamily="heading">
              59,90
            </Text>
          </HStack>
        </HStack>

        <Text color="gray.600">
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>
      </VStack>

      <VStack>
        <HStack space={2} mt={6} mb={4}>
          <Text color="gray.600" fontFamily="heading">
            Aceita troca?
          </Text>
          <Text color="gray.600">Sim</Text>
        </HStack>

        <VStack>
          <Text color="gray.600" fontFamily="heading">
            Meios de pagamento
          </Text>

          <VStack mt={2} mb={6} space={2}>
            {paymentMethods.map((method) => (
              <HStack key={method.id} alignItems="center" space={2}>
                <method.icon size={18} color={colors.gray[700]} />
                <Text color="gray.600">{method.label}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
