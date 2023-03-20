import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Image, Pressable, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Input } from "../Input";
import { PressableEyeIcon } from "../PressableEyeIcon";

import DefaultAvatar from "../../assets/default-avatar.png";
import Pencil from "../../assets/pencil.png";

type SignUpData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup
    .string()
    .required("Informe o email")
    .email("Formato de email inválido"),
  phone: yup.string().required("Informe o telefone"),
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
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp({ name, email, password, phone }: SignUpData) {
    console.log(name, email, password, phone);
  }

  return (
    <VStack space={4} alignItems="center" w="full">
      <Box position="relative">
        <Avatar size={24} mt={8} source={DefaultAvatar} />
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
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.phone?.message}
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
        onPress={handleSubmit(handleSignUp)}
      />
    </VStack>
  );
}
