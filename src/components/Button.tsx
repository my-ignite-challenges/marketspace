import { ReactNode } from "react";

import {
  Button as NativeBaseButton,
  HStack,
  IButtonProps,
  Text,
} from "native-base";

type Props = IButtonProps & {
  icon?: ReactNode;
  title: string;
  textColor?: string;
};

export function Button({
  icon,
  textColor = "gray.100",
  title,
  ...props
}: Props) {
  return (
    <NativeBaseButton
      h="42px"
      {...props}
      fontFamily="heading"
      borderRadius="6px"
      _pressed={{
        opacity: 0.8,
      }}
    >
      <HStack space={2} alignItems="center" justifyContent="center">
        {icon}
        <Text color={textColor} fontFamily="heading">
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  );
}
