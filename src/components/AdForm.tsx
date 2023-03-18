import { useState } from "react";

import {
  useTheme,
  Text,
  VStack,
  Pressable,
  HStack,
  TextArea,
  Radio,
  Switch,
  Checkbox,
  ScrollView,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { paymentMethods } from "../utils";

import adImage from "../assets/bike.png";

export function AdForm() {
  const [productCondition, setProductCondition] = useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  const data = {} as any;

  const { colors } = useTheme();

  const isImageSelected = false; // => temporary

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Header
        title={data.id ? "Editar anúncio" : "Criar anúncio"}
        leftIcon={<ArrowLeft color={colors.gray[700]} size={24} />}
        px={6}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={6}>
          <Text color="gray.600" fontFamily="heading" fontSize="md">
            Imagens
          </Text>
          <Text color="gray.500">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack mt={4} w="full">
            <Pressable
              bgColor="gray.300"
              w="100px"
              h="100px"
              alignItems="center"
              justifyContent="center"
              _pressed={{ opacity: 0.8 }}
              borderRadius="6px"
              position="relative"
            >
              <Plus color={colors.gray[400]} size={24} />
              {isImageSelected && (
                <Pressable
                  w={4}
                  h={4}
                  rounded="full"
                  bgColor="gray.600"
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                  top={1}
                  right={1}
                >
                  <X size={12} color={colors.gray[100]} />
                </Pressable>
              )}
            </Pressable>
          </HStack>

          <VStack mt={8}>
            <Text color="gray.600" fontFamily="heading" fontSize="md">
              Sobre o produto
            </Text>

            <VStack space={4} mt={4}>
              <Input placeholder="Título do anúncio" />
              <TextArea
                bgColor="gray.100"
                px={4}
                fontSize="md"
                w="full"
                h={40}
                placeholder="Descrição do produto"
                placeholderTextColor="gray.400"
                borderColor="transparent"
                borderRadius="6px"
                _focus={{
                  borderWidth: 1,
                  borderColor: "blue.500",
                }}
                autoCompleteType
              />
              <Radio.Group
                name="product_condition"
                accessibilityLabel="Condição do produto"
                value={productCondition}
                onChange={(value) => {
                  setProductCondition(value);
                }}
                colorScheme="brand"
              >
                <HStack w="full" alignItems="center" space={8}>
                  <Radio value="novo">Produto novo</Radio>
                  <Radio value="usado">Produto usado</Radio>
                </HStack>
              </Radio.Group>
            </VStack>

            <VStack space={4} mt={8}>
              <Text color="gray.600" fontFamily="heading" fontSize="md">
                Venda
              </Text>
              <Input
                leftElement={
                  <Text color="gray.700" fontSize="md" ml={4}>
                    R$
                  </Text>
                }
                placeholder="Valor do produto"
              />
            </VStack>

            <VStack alignItems="flex-start" mt={6}>
              <Text fontFamily="heading" color="gray.600">
                Aceita troca?
              </Text>
              <Switch
                size="lg"
                colorScheme="blue.500"
                onTrackColor="blue.500"
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
          </VStack>
        </VStack>
        <HStack
          w="full"
          h="90px"
          bgColor="gray.100"
          alignItems="center"
          justifyContent="space-between"
          mt={6}
          px={6}
        >
          <Button
            title="Cancelar"
            bgColor="gray.300"
            textColor="gray.700"
            w="48%"
          />
          <Button title="Avançar" bgColor="gray.700" w="48%" />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
