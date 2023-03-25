import { useState } from "react";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  useTheme,
  Text,
  VStack,
  Pressable,
  HStack,
  Image,
  TextArea,
  Radio,
  Switch,
  Checkbox,
  ScrollView,
  useToast,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { paymentMethods } from "../utils";

type ProductImage = {
  name: string;
  uri: string;
  type: string;
};

type ProductImagePickerProps = {
  uri?: string;
  imageIndex?: number;
};

export function AdForm() {
  const [productCondition, setProductCondition] = useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [selectedImages, setSelectedImages] = useState<ProductImage[]>([]);

  const data = {} as any;

  const { colors } = useTheme();
  const toast = useToast();

  async function handleProductImagesSelection() {
    try {
      console.log("clicked");
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      console.log(selectedPhoto);

      if (selectedPhoto.canceled) {
        return;
      }

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri
        );

        if (
          photoInfo.exists &&
          photoInfo.size &&
          photoInfo.size / 1024 / 1024 > 5
        ) {
          return toast.show({
            title:
              "O tamanho da imagem selecionada excede o limite de 5MB. Selecione uma imagem menor.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();

        const selectedPhotoFile = {
          name: `mypicture.${fileExtension}`.toLowerCase(),
          uri: selectedPhoto.assets[0].uri,
          type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
        } as any;

        if (selectedImages.length <= 2) {
          setSelectedImages([...selectedImages, selectedPhotoFile]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleProductImageRemoval(imageIndex: number | undefined) {
    const filteredSelectedImages = selectedImages.filter(
      (_, index) => imageIndex !== index
    );

    setSelectedImages(filteredSelectedImages);
  }

  function ProductImagePicker({ uri, imageIndex }: ProductImagePickerProps) {
    return (
      <Pressable
        bgColor="gray.300"
        w="100px"
        h="100px"
        alignItems="center"
        justifyContent="center"
        _pressed={{ opacity: 0.8 }}
        borderRadius="6px"
        position="relative"
        onPress={handleProductImagesSelection}
        disabled={!!uri}
        zIndex={1}
      >
        <Plus color={colors.gray[400]} size={24} />

        {uri && (
          <Image
            source={{ uri }}
            alt="Imagem do Produto"
            w="100px"
            h="100px"
            position="absolute"
            top={0}
            left={0}
            resizeMode="contain"
            borderRadius="6px"
          />
        )}

        {uri && (
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
            onPress={() => handleProductImageRemoval(imageIndex)}
            zIndex={2}
          >
            <X size={12} color={colors.gray[100]} />
          </Pressable>
        )}
      </Pressable>
    );
  }

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
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrível!
          </Text>

          <HStack mt={4} w="full" space={2}>
            {selectedImages.map((image, index) => (
              <ProductImagePicker
                uri={selectedImages[index]?.uri}
                key={image.uri}
                imageIndex={index}
              />
            ))}

            {selectedImages.length < 3 && <ProductImagePicker />}
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
