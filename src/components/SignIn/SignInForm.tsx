import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Text, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "../Input";
import { Button } from "../Button";
import { PressableEyeIcon } from "../PressableEyeIcon";
import { useAuth } from "../../hooks/useAuth";

type SignInData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("Informe o email"),
  password: yup.string().required("Informe a senha"),
});

export function SingInForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: SignInData) {
    try {
      setIsAuthenticating(true);
      await signIn(email, password);
    } catch (error) {
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <VStack space={4} alignItems="center" mt="76px" pb="68px" w="full">
      <Text color="gray.600">Acesse sua conta</Text>
      <VStack>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry={showPassword}
              InputRightElement={
                <PressableEyeIcon
                  contentIsVisible={showPassword}
                  onIconPress={() => setShowPassword(!showPassword)}
                />
              }
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              onSubmitEditing={handleSubmit(handleSignIn)}
            />
          )}
        />
      </VStack>

      <Button
        title="Entrar"
        w="full"
        bgColor="blue.500"
        isLoading={isAuthenticating}
        onPress={handleSubmit(handleSignIn)}
      />
    </VStack>
  );
}
