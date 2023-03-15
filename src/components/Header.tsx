import { ReactNode } from "react";

import { Box, HStack, Pressable, Text } from "native-base";

type Props = {
  title?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Header({ leftIcon, rightIcon, title }: Props) {
  return (
    <HStack
      w="full"
      h="26px"
      justifyContent="space-between"
      alignItems="center"
      mt={16}
      mb={8}
    >
      <Pressable _pressed={{ opacity: 0.8 }}>
        {leftIcon ? leftIcon : <Box w={6} h={6} />}
      </Pressable>
      <Text color="gray.700" fontFamily="heading" fontSize="xl">
        {title}
      </Text>
      <Pressable _pressed={{ opacity: 0.8 }}>
        {rightIcon ? rightIcon : <Box w={6} h={6} />}
      </Pressable>
    </HStack>
  );
}
