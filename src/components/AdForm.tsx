import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import {
  useTheme,
  Text,
  VStack,
  Pressable,
  HStack,
  Image,
  Radio,
  Switch,
  Checkbox,
  ScrollView,
  useToast,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import * as yup from "yup";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { TextArea } from "./TextArea";

import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { event } from "../utils/event";
import { paymentMethods } from "../utils";
import {
  AppBottomTabNavigatorRoutes,
  AppStackNavigatorRoutes,
} from "../routes/app.routes";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";
import { PaymentMethod } from "../@types";

type ProductImagePickerProps = {
  uri?: string;
  imageIndex?: number;
};

type ProductInputData = {
  name: string;
  description: string;
  price: number;
  payment_methods: string[];
  is_new: string;
};

type Props = {
  adId?: string;
};

const MAX_NUMBER_OF_IMAGES = 3;

const adSchema = yup.object({
  name: yup.string().required("O título do anúncio é obrigatório."),
  description: yup.string().required("A descrição do produto é obrigatória."),
  price: yup.string().required("O valor do produto é obrigatório."),
  payment_methods: yup
    .array()
    .min(1)
    .of(yup.string().required())
    .required("Selecione pelo menos um meio de pagamento"),
  is_new: yup.string().required("Informe se o produto é novo ou usado"),
});

export function AdForm({ adId }: Props) {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [acceptsTrade, setAcceptsTrade] = useState(false);
  const [isSubmittingProductData, setIsSubmittingProductData] = useState(false);
  const [adDataIsLoading, setAdDataIsLoading] = useState(false);
  const [latestRemovedImagesIds, setLatestRemovedImagesIds] = useState<
    string[]
  >([]);

  const { user } = useAuth();
  const { colors } = useTheme();
  const toast = useToast();
  const { navigate, goBack } = useNavigation<AppBottomTabNavigatorRoutes>();
  const stackNavigation = useNavigation<AppStackNavigatorRoutes>();

  const {
    control,
    handleSubmit,
    trigger,
    clearErrors,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ProductInputData>({
    resolver: yupResolver(adSchema),
    defaultValues: {
      is_new: "new",
      payment_methods: [],
    },
  });

  async function fetchAdDetails() {
    try {
      setAdDataIsLoading(true);
      const response = await api.get(`/products/${adId}`);
      setSelectedImages(response.data.product_images);
      setAcceptsTrade(response.data.accept_trade);
      reset({
        name: response.data.name,
        description: response.data.description,
        is_new: response.data.is_new ? "new" : "used",
        price: response.data.price,
        payment_methods: response.data.payment_methods.map(
          (item: PaymentMethod) => item.key
        ),
      });
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível carregar os dados do anúncio",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setAdDataIsLoading(false);
    }
  }

  async function handleProductImagesSelection() {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

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

        if (selectedImages.length <= MAX_NUMBER_OF_IMAGES - 1) {
          setSelectedImages([...selectedImages, selectedPhotoFile]);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  function handleProductImageRemoval(imageIndex: number | undefined) {
    const imageToBeRemoved = selectedImages.find(
      (_, index) => index === imageIndex
    );

    if (!latestRemovedImagesIds.includes(imageToBeRemoved.id)) {
      setLatestRemovedImagesIds([
        ...latestRemovedImagesIds,
        imageToBeRemoved.id,
      ]);
    }

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
            resizeMode={Platform.OS === "ios" ? "cover" : "contain"}
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
            onPress={() => {
              handleProductImageRemoval(imageIndex);
            }}
            zIndex={2}
          >
            <X size={12} color={colors.gray[100]} />
          </Pressable>
        )}
      </Pressable>
    );
  }

  async function handleProductImagesUpdate() {
    try {
      const productImagesFormData = new FormData();

      selectedImages.forEach((image) => {
        if (image.type) {
          productImagesFormData.append("images", image);
        }
      });
      productImagesFormData.append("product_id", adId!);

      await api.delete("/products/images", {
        data: {
          productImagesIds: latestRemovedImagesIds,
        },
      });

      await api.post("/products/images", productImagesFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : "Não foi possível atualizar as imagens do produto",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function handleAdFormSubmission({
    name,
    description,
    price,
    is_new,
    payment_methods,
  }: ProductInputData) {
    try {
      setIsSubmittingProductData(true);

      const productData = {
        name,
        description,
        is_new: is_new === "new",
        price: Number(price),
        accept_trade: acceptsTrade,
        payment_methods,
      };

      const response = adId
        ? await api.put(`/products/${adId}`, productData)
        : await api.post("/products", productData);

      if (!adId && response.data && selectedImages.length > 0) {
        const productImagesFormData = new FormData();

        selectedImages.forEach((image) => {
          productImagesFormData.append("images", image);
        });
        productImagesFormData.append("product_id", response.data.id);

        await api.post("/products/images", productImagesFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      adId && latestRemovedImagesIds.length > 0 && handleProductImagesUpdate();

      toast.show({
        title: `Produto ${adId ? "atualizado" : "cadastrado"} com successo!`,
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      toast.show({
        title:
          error instanceof AppError
            ? error.message
            : `Não foi possível ${
                adId ? "atualizar os dados do" : "cadastrar o"
              } produto. Verifique os dados e tente novamente.`,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsSubmittingProductData(false);
      navigate("Home");
    }
  }

  function handleNavigationToAdPreview() {
    if (isValid) {
      clearErrors();
      stackNavigation.navigate("AdPreview", {
        eventName: "submitAdForm",
        data: {
          ...getValues(),
          payment_methods: getValues().payment_methods.map((item) => {
            const paymentMethod = paymentMethods.find(
              (method) => method.key === item
            );

            return paymentMethod;
          }),
          user_id: user.id,
          product_images: selectedImages,
          user: {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
          },
        },
      });
    } else {
      trigger();
    }
  }

  useEffect(() => {
    if (adId) {
      fetchAdDetails();
    }
  }, []);

  useEffect(() => {
    event.on("submitAdForm", handleSubmit(handleAdFormSubmission));

    return () => {
      event.off("submitAdForm");
    };
  }, [handleAdFormSubmission]);

  if (adDataIsLoading) {
    return <Loading />;
  }

  return (
    <VStack bgColor="gray.200" flex={1}>
      <Header
        title={adId ? "Editar anúncio" : "Criar anúncio"}
        leftIcon={<ArrowLeft color={colors.gray[700]} size={24} />}
        px={6}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={6}>
          <Text color="gray.600" fontFamily="heading" fontSize="md">
            Imagens
          </Text>
          <Text color="gray.500">
            Escolha até {MAX_NUMBER_OF_IMAGES} imagens para mostrar o quanto o
            seu produto é incrível!
          </Text>

          <HStack mt={4} w="full" space={2}>
            {selectedImages.map((image, index) => (
              <ProductImagePicker
                uri={
                  selectedImages[index]?.uri ||
                  `${api.defaults.baseURL}/images/${selectedImages[index]?.path}`
                }
                key={adId ? image.id : image.uri + index}
                imageIndex={index}
              />
            ))}

            {selectedImages.length < MAX_NUMBER_OF_IMAGES && (
              <ProductImagePicker />
            )}
          </HStack>

          <VStack mt={8}>
            <Text color="gray.600" fontFamily="heading" fontSize="md">
              Sobre o produto
            </Text>

            <VStack space={4} mt={4}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Título do anúncio"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
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
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="is_new"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    name="is_new"
                    accessibilityLabel="Condição do produto"
                    value={value}
                    onChange={onChange}
                    colorScheme="brand"
                    errorMessage={errors.is_new?.message}
                  >
                    <HStack w="full" alignItems="center" space={8}>
                      <Radio value="new">Produto novo</Radio>
                      <Radio value="used">Produto usado</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </VStack>

            <VStack space={4} mt={8}>
              <Text color="gray.600" fontFamily="heading" fontSize="md">
                Venda
              </Text>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftElement={
                      <Text color="gray.700" fontSize="md" ml={4}>
                        R$
                      </Text>
                    }
                    keyboardType="number-pad"
                    placeholder="Valor do produto"
                    value={value?.toString()}
                    onChangeText={onChange}
                    errorMessage={errors.price?.message}
                  />
                )}
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
                onValueChange={setAcceptsTrade}
              />
            </VStack>

            <VStack mt={6}>
              <Text fontFamily="heading" color="gray.600">
                Meios de pagamento aceitos
              </Text>

              <Controller
                control={control}
                name="payment_methods"
                render={({ field: { onChange, value } }) => (
                  <CheckboxGroup
                    onChange={onChange}
                    value={value}
                    accessibilityLabel="Escolha os meios de pagamento"
                    errorMessage={errors.payment_methods?.message}
                  >
                    {paymentMethods?.map((method) => (
                      <Checkbox
                        value={method.key}
                        my={2}
                        key={method.key}
                        colorScheme="brand"
                      >
                        <Text color="gray.600" fontSize="md">
                          {method.name}
                        </Text>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
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
            onPress={goBack}
          />
          <Button
            title="Avançar"
            bgColor="gray.700"
            w="48%"
            isLoading={isSubmittingProductData}
            onPress={handleNavigationToAdPreview}
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
