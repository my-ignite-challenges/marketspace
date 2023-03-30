import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Box, Image, Pressable, useToast, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Input } from "../Input";
import { PressableEyeIcon } from "../PressableEyeIcon";

import DefaultAvatar from "../../assets/default-avatar.png";
import Pencil from "../../assets/pencil.png";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorRoutes } from "../../routes/auth.routes";

export type SignUpData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirmation: string;
};

const phoneRegex =
  /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/;

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup
    .string()
    .required("Informe o email")
    .email("Formato de email inválido"),
  tel: yup
    .string()
    .required("Informe o telefone")
    .matches(phoneRegex, "Número de telefone parece inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "Deve conter no mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});

export function SignUpForm() {
  const [isSigningUp, setIsSigninUp] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(true);
  const [avatarFile, setAvatarFile] = useState<any>(null);

  const toast = useToast();
  const { navigate } = useNavigation<AuthStackNavigatorRoutes>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleAvatarSelection() {
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

        setAvatarFile(selectedPhotoFile);
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleSignUp({ name, email, password, tel }: SignUpData) {
    try {
      setIsSigninUp(true);
      const signUpForm = new FormData();

      signUpForm.append("avatar", avatarFile);
      signUpForm.append("name", name);
      signUpForm.append("email", email);
      signUpForm.append("tel", tel);
      signUpForm.append("password", password);

      await api.post("/users", signUpForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.show({
        title: "Usuário cadastrado com sucesso. Agora faça seu login!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("SignIn");
    } catch (error: any) {
      if (error && error instanceof AxiosError) {
        toast.show({
          title: error.message,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsSigninUp(false);
    }
  }

  return (
    <VStack space={4} alignItems="center" w="full">
      <Box position="relative">
        <Avatar
          size={24}
          mt={8}
          source={avatarFile?.uri ? { uri: avatarFile?.uri } : DefaultAvatar}
        />
        <Pressable
          bgColor={"blue.500"}
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          rounded="full"
          position="absolute"
          bottom={0}
          right={-4}
          onPress={handleAvatarSelection}
        >
          <Image source={Pencil} alt="Ícone de edição" />
        </Pressable>
      </Box>

      <VStack>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="tel"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone (xx988889999)"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.tel?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              InputRightElement={
                <PressableEyeIcon
                  contentIsVisible={showPassword}
                  onIconPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={showPassword}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirmation"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar Senha"
              InputRightElement={
                <PressableEyeIcon
                  contentIsVisible={showPasswordConfirmation}
                  onIconPress={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                />
              }
              secureTextEntry={showPasswordConfirmation}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.password_confirmation?.message}
            />
          )}
        />
      </VStack>

      <Button
        title="Criar"
        w="full"
        bgColor="gray.700"
        mt={-2}
        isLoading={isSigningUp}
        onPress={handleSubmit(handleSignUp)}
      />
    </VStack>
  );
}
