import { ReactNode } from "react";

import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

import { AppBottomTabNavigatorRoutes } from "../routes/app.routes";

type Props = IHStackProps & {
  title?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
};

export function Header({
  leftIcon,
  onRightIconPress,
  rightIcon,
  title,
  ...props
}: Props) {
  const { goBack } = useNavigation<AppBottomTabNavigatorRoutes>();

  return (
    <HStack
      w="full"
      h="26px"
      justifyContent="space-between"
      alignItems="center"
      mt={16}
      mb={8}
      {...props}
    >
      <Pressable _pressed={{ opacity: 0.8 }} onPress={() => goBack()}>
        {leftIcon ? leftIcon : <Box w={6} h={6} />}
      </Pressable>
      <Text color="gray.700" fontFamily="heading" fontSize="xl">
        {title}
      </Text>
      <Pressable _pressed={{ opacity: 0.8 }} onPress={onRightIconPress}>
        {rightIcon ? rightIcon : <Box w={6} h={6} />}
      </Pressable>
    </HStack>
  );
}
