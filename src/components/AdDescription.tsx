import { HStack, Text, useTheme, VStack } from "native-base";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

import { AdProps } from "../@types";
import { assignIconToPaymentMethods } from "../utils";

import { api } from "../services/api";

type Props = {
  data: AdProps;
};

export function AdDescription({ data }: Props) {
  const { colors } = useTheme();

  const paymentMethodsWithIcons = assignIconToPaymentMethods(
    data.payment_methods
  );

  return (
    <VStack px={6}>
      <HStack space={2} alignItems="center" mt={5}>
        <Avatar
          source={{
            uri:
              data.user?.avatar &&
              `${api.defaults.baseURL}/images/${data.user?.avatar}`,
          }}
          size={8}
          borderWidth="2px"
        />
        <Text color="gray.700">{data.user?.name}</Text>
      </HStack>

      <VStack mt={7} space={2}>
        <Badge title="Novo" bgColor="gray.300" textColor="gray.600" />
        <HStack justifyContent="space-between">
          <Text color="gray.700" fontSize="xl" fontFamily="heading">
            {data?.name}
          </Text>
          <HStack alignItems="center" space={1}>
            <Text color="blue.500" fontFamily="heading">
              R$
            </Text>
            <Text color="blue.500" fontSize="xl" fontFamily="heading">
              {data.price}
            </Text>
          </HStack>
        </HStack>

        <Text color="gray.600">{data.description}</Text>
      </VStack>

      <VStack>
        <HStack space={2} mt={6} mb={4}>
          <Text color="gray.600" fontFamily="heading">
            Aceita troca?
          </Text>
          <Text color="gray.600">{data.accept_trade ? "Sim" : "Não"}</Text>
        </HStack>

        <VStack>
          <Text color="gray.600" fontFamily="heading">
            Meios de pagamento
          </Text>

          <VStack mt={2} mb={6} space={2}>
            {paymentMethodsWithIcons?.map((method) => (
              <HStack key={method.key} alignItems="center" space={2}>
                {method.icon && (
                  <method.icon size={18} color={colors.gray[700]} />
                )}
                <Text color="gray.600">{method.name}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
