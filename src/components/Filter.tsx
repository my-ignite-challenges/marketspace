import { useState } from "react";

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
import { Modal } from "react-native";
import { Chip } from "./Chip";

import { paymentMethods } from "../utils";

type Props = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

export function Filter({ showModal, setShowModal }: Props) {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  return (
    <Modal
      transparent
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <VStack bgColor="gray.200" flex={1} px={6} pt={6}>
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
            onPress={() => setShowModal(false)}
          />
        </HStack>
        <VStack mt={6}>
          <Text fontFamily="heading" color="gray.600">
            Condição
          </Text>
          <HStack space={2} mt={3}>
            <Chip title="Novo" bgColor="blue.500" isDeletable />
            <Chip title="Usado" bgColor="gray.300" textColor="gray.500" />
          </HStack>
        </VStack>

        <VStack alignItems="flex-start" mt={6}>
          <Text fontFamily="heading" color="gray.600">
            Aceita troca?
          </Text>
          <Switch size="lg" colorScheme="blue.500" onTrackColor="blue.500" />
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
                value={method.label}
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
          />
          <Button title="Aplicar Filtros" bgColor="gray.700" w="48%" />
        </HStack>
      </VStack>
    </Modal>
  );
}
