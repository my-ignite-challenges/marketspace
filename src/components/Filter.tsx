import { useEffect, useState } from "react";

import {
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Switch,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "./Button";

import { Filters } from "../screens/Home";
import { paymentMethods } from "../utils";
import { SelectableFilterChip } from "./SelectableFilterChip";

type Props = {
  setFilters: (filters: Filters) => void;
  setShowFilter: (value: boolean) => void;
};

export function Filter({ setFilters, setShowFilter }: Props) {
  const [productCondition, setProductCondition] = useState<string>("new");
  const [acceptsTrade, setAcceptsTrade] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([]);

  function resetFilters() {
    setProductCondition("");
    setAcceptsTrade(false);
    setSelectedPaymentMethods([]);
  }

  useEffect(() => {
    setFilters({} as Filters);
  }, []);

  return (
    <VStack
      flex={1}
      bgColor="gray.200"
      px={6}
      pt={6}
      position="absolute"
      top={8}
      left={0}
      right={0}
      bottom={0}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontFamily="heading" fontSize="xl" color="gray.700">
          Filtrar anúncios
        </Text>
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="window-close"
              color="gray.400"
              size={6}
            />
          }
          _pressed={{ bgColor: "transparent" }}
          onPress={() => setShowFilter(false)}
        />
      </HStack>
      <VStack mt={6}>
        <Text fontFamily="heading" color="gray.600">
          Condição
        </Text>
        <HStack space={2} mt={3}>
          <SelectableFilterChip
            title="Novo"
            isActive={productCondition === "new"}
            onPress={() => setProductCondition("new")}
          />
          <SelectableFilterChip
            title="Usado"
            isActive={productCondition === "used"}
            onPress={() => setProductCondition("used")}
          />
        </HStack>
      </VStack>

      <VStack alignItems="flex-start" mt={6}>
        <Text fontFamily="heading" color="gray.600">
          Aceita troca?
        </Text>
        <Switch
          size="lg"
          colorScheme="blue.500"
          onTrackColor="blue.500"
          isChecked={acceptsTrade}
          onValueChange={setAcceptsTrade}
        />
      </VStack>

      <VStack mt={6}>
        <Text fontFamily="heading" color="gray.600">
          Meios de pagamento aceitos
        </Text>
        <Checkbox.Group
          onChange={setSelectedPaymentMethods}
          value={selectedPaymentMethods}
          accessibilityLabel="Escolha os meios de pagameno"
        >
          {paymentMethods.map((method) => (
            <Checkbox
              value={method.value}
              my={2}
              key={method.id}
              colorScheme="brand"
            >
              <Text color="gray.600" fontSize="md">
                {method.label}
              </Text>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </VStack>

      <HStack flex={1} justifyContent="space-between" mt={16}>
        <Button
          title="Redefinir Filtros"
          bgColor="gray.300"
          textColor="gray.700"
          w="48%"
          onPress={resetFilters}
        />
        <Button
          title="Aplicar Filtros"
          bgColor="gray.700"
          w="48%"
          onPress={() => {
            setFilters({
              is_new: productCondition,
              accept_trade: acceptsTrade,
              payment_methods: selectedPaymentMethods,
            });

            setShowFilter(false);
          }}
        />
      </HStack>
    </VStack>
  );
}
